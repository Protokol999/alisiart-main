import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { alina, grib, picture8 } from '../../assets/images/index';
import { Pictures } from '../../components/Pictures/Pictures';
import { useI18n } from '../../i18n';
import './Home.scss';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      }),
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const r = el => { if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el); };

  return (
    <div className='home'>

      {/* ───── 01 HERO ───── */}
      <section className='home__hero'>
        <img className='home__hero-bg' src={grib} alt='' />
        <div className='home__hero-body'>
          <span className='home__hero-eyebrow'>Alisi Art Studio</span>
          <h1 className='home__hero-title'>{t('home.title')}</h1>
          <div className='home__hero-cta'>
            <button className='btn btn--solid' onClick={() => navigate('/originals')}>
              {t('home.shopOriginals')}
            </button>
            <button className='btn btn--ghost' onClick={() => navigate('/prints')}>
              {t('home.shopPrints')}
            </button>
          </div>
        </div>
        <div className='home__hero-scroll'>
          <svg width='18' height='28' viewBox='0 0 18 28' fill='none'>
            <rect x='0.75' y='0.75' width='16.5' height='26.5' rx='8.25' stroke='currentColor' strokeWidth='1.5'/>
            <rect className='home__hero-scroll-dot' x='8' y='5' width='2' height='6' rx='1' fill='currentColor'/>
          </svg>
        </div>
      </section>

      {/* ───── 02 WORKS ───── */}
      <section className='home__works'>
        <div className='home__works-head' ref={r}>
          <div className='home__works-head-left'>
            <span className='home__works-num'>02</span>
            <h2 className='home__works-title'>Works</h2>
          </div>
          <span className='home__works-caption'>Selected originals</span>
        </div>
        <div className='home__works-grid' ref={r}>
          <Pictures />
        </div>
        <div className='home__works-foot' ref={r}>
          <button className='btn btn--solid' onClick={() => navigate('/originals')}>
            {t('home.shopOriginals')} &rarr;
          </button>
        </div>
      </section>

      {/* ───── 03 ARTIST ───── */}
      <section className='home__artist'>
        <div className='home__artist-photo' ref={r}>
          <img src={alina} alt='Alina' />
        </div>
        <div className='home__artist-info' ref={r}>
          <span className='home__artist-label'>The Artist</span>
          <h2 className='home__artist-name'>{t('home.aboutTitle')}</h2>
          <div className='home__artist-divider' />
          <button className='btn btn--solid' onClick={() => navigate('about')}>
            {t('home.aboutText')}
          </button>
        </div>
      </section>

      {/* ───── 04 PROCESS ───── */}
      <section className='home__process'>
        <div className='home__process-label' ref={r}>
          <span />
          <em>Process</em>
          <span />
        </div>
        <div className='home__process-video' ref={r}>
          <iframe
            src='https://www.youtube.com/embed/LBf4fdcVIhA?si=AiOS-fayHjvdHPUM'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        </div>
      </section>

      {/* ───── 05 COMMISSION ───── */}
      <section className='home__commission'>
        <img className='home__commission-bg' src={picture8} alt='' />
        <div className='home__commission-overlay'>
          <div ref={r}>
            <span className='home__commission-eyebrow'>Custom work</span>
            <h2 className='home__commission-title'>
              {t('home.customTitle')}<br />
              <em>{t('home.customSubTitle')}</em>
            </h2>
            <button
              className='btn btn--ghost-light'
              onClick={() => navigate('commissions')}
            >
              {t('home.customButton')} &rarr;
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
