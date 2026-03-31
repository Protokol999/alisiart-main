import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { bigSea } from '../../assets/images/index';
import { Originalsp } from '../../components/originalsp/Originalsp';
import { painting } from '../../data/paintings';
import { useI18n } from '../../i18n';
import './Originals.scss';

export const Originals = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const revealRefs = useRef([]);

  const rest = painting.slice(0, -3);
  const canvases = painting.slice(-3);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        }),
      { threshold: 0.08 }
    );
    revealRefs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const r = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className='originals'>
      {/* ── Hero ── */}
      <div className='originals__hero'>
        <img className='originals__hero-img' src={bigSea} alt='' />
        <div className='originals__hero-text'>
          <h1 className='originals__hero-title'>{t('originals.title')}</h1>
        </div>
      </div>

      {/* ── Small Originals (all 14, painting-13 is sold) ── */}
      <section className='originals__section'>
        <header className='originals__section-head' ref={r}>
          <div className='originals__section-head-left'>
            <span className='originals__section-num'>01</span>
            <h2 className='originals__section-title'>
              {t('originals.subtitle')}
            </h2>
          </div>
          <span className='originals__section-meta'>
            {rest.filter(p => !p.sold).length} available
          </span>
        </header>

        <div className='originals__grid-wrap' ref={r}>
          <Originalsp items={rest} />
        </div>
      </section>

      {/* ── Large Canvases (all sold) ── */}
      <section className='originals__section originals__section--dark'>
        <header className='originals__section-head' ref={r}>
          <div className='originals__section-head-left'>
            <span className='originals__section-num'>02</span>
            <h2 className='originals__section-title'>
              {t('originals.canvases')}
            </h2>
          </div>
          <span className='originals__section-sold-tag'>All Sold</span>
        </header>

        <div className='originals__canvases' ref={r}>
          {canvases.map((p, i) => {
            const img = p.media.find(m => m.type === 'image')?.src;
            return (
              <div
                key={p.id}
                className='originals__canvas-item'
                onClick={() => navigate(`/paintings/${p.id}`)}
              >
                <div className='originals__canvas-img-wrap'>
                  <img src={img} alt='' />
                  <div className='originals__canvas-sold'>SOLD</div>
                </div>
                <div className='originals__canvas-meta'>
                  <span className='originals__canvas-index'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
