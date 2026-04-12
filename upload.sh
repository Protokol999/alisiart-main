export CLOUDINARY_URL=cloudinary://536339665689157:13rhEdJffB8AHYO0zibNd-Dtsi4@dsarxqp57

for file in src/assets/images/*.jpg src/assets/images/*.jpeg src/assets/images/*.png; do
  [ -f "$file" ] && cld uploader upload "$file" use_filename=true unique_filename=false folder=images
done

for file in src/assets/img/*.jpg src/assets/img/*.jpeg src/assets/img/*.png; do
  [ -f "$file" ] && cld uploader upload "$file" use_filename=true unique_filename=false folder=img
done

for file in src/assets/video/*.mp4; do
  [ -f "$file" ] && cld uploader upload "$file" use_filename=true unique_filename=false folder=video resource_type=video
done

echo "Готово!"
