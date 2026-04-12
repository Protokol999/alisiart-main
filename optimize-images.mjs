import { mkdirSync, readdirSync } from 'fs';
import { basename, extname, join } from 'path';
import sharp from 'sharp';

const folders = ['src/assets/images', 'src/assets/img'];

for (const folder of folders) {
  const outFolder = join(folder, 'optimized');
  mkdirSync(outFolder, { recursive: true });

  const files = readdirSync(folder).filter(f =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
  );

  for (const file of files) {
    const input = join(folder, file);
    const output = join(outFolder, basename(file, extname(file)) + '.webp');
    await sharp(input).webp({ quality: 82 }).toFile(output);
    console.log(`✅ ${file} → webp`);
  }
}
