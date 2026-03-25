import { useEffect, useState } from 'react';
import './Preloader.scss';

const LETTERS = 'ALISI ART'.split('');
const MIN_MS = 1800; // минимальное время показа
const MAX_MS = 3200; // максимальное — больше не ждём никогда

export const Preloader = ({ onComplete }) => {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setHiding(true);
      setTimeout(onComplete, 600);
    };

    // Принудительно закрыть через MAX_MS
    const maxTimer = setTimeout(finish, MAX_MS);

    // Закрыть после MIN_MS как только загрузится hero-картинка
    const minTimer = setTimeout(() => {
      const hero = document.querySelector('.home__hero-bg, .originals__hero-img, img');
      if (!hero || hero.complete) {
        finish();
      } else {
        hero.addEventListener('load',  finish, { once: true });
        hero.addEventListener('error', finish, { once: true });
      }
    }, MIN_MS);

    return () => {
      clearTimeout(maxTimer);
      clearTimeout(minTimer);
    };
  }, [onComplete]);

  return (
    <div className={`preloader${hiding ? ' preloader--hiding' : ''}`} aria-hidden='true'>
      <div className='preloader__inner'>
        <div className='preloader__word'>
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              className='preloader__letter'
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>

        <div className='preloader__tagline'>
          <span className='preloader__tagline-text'>original paintings</span>
        </div>

        <div className='preloader__track'>
          <div className='preloader__fill' />
        </div>
      </div>
    </div>
  );
};
