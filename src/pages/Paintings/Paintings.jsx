import { useEffect, useState } from 'react';
import { FaEnvelope, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { painting } from '../../data/paintings';
import { useI18n } from '../../i18n';
import './Paintings.scss';
export const Paintings = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const currentPainting = painting.find(p => p.id === id);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInfoVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!currentPainting) return;
    const mediaLen = currentPainting.media.length;
    const handleKey = e => {
      if (!galleryOpen) return;
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % mediaLen);
      if (e.key === 'ArrowLeft')
        setActiveIndex(i => (i - 1 + mediaLen) % mediaLen);
      if (e.key === 'Escape') setGalleryOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [galleryOpen, currentPainting]);

  if (!currentPainting) {
    return <div>Painting not found</div>;
  }

  const media = currentPainting.media;
  const videoItem = media.find(m => m.type === 'video');
  const activeMedia = media[activeIndex];

  const backgroundImage = media.find(item => item.type === 'image')?.src;

  const openGallery = (index = 0) => {
    setActiveIndex(index);
    setGalleryOpen(true);
  };

  const next = () => setActiveIndex(i => (i + 1) % media.length);
  const prev = () => setActiveIndex(i => (i - 1 + media.length) % media.length);

  const instagramHandle = currentPainting.instagram
    ? '@' +
      currentPainting.instagram
        .replace('https://instagram.com/', '')
        .replace('https://www.instagram.com/', '')
    : currentPainting.instagram;

  return (
    <div
      className='painting'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='painting__left'>
        <div className='painting__video-wrapper' onClick={() => openGallery(0)}>
          {videoItem ? (
            <video
              className='painting__video-main'
              src={videoItem.src}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img className='painting__video-main' src={media[0]?.src} alt='' />
          )}
          <div className='painting__video-overlay'>
            <span className='painting__video-hint'>View all photos</span>
          </div>
        </div>

        <div className='painting__images'>
          {media.map((item, index) => (
            <div
              key={index}
              className='painting__thumb'
              onClick={() => openGallery(index)}
            >
              {item.type === 'video' ? (
                <video src={item.src} />
              ) : (
                <img src={item.src} alt='' />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`painting__description ${infoVisible ? 'painting__description--visible' : ''}`}
      >
        <h2 className='painting__title'>{t(currentPainting.title)}</h2>

        <div className='painting__meta'>
          <div className='painting__meta-item'>
            <span className='painting__meta-label'>
              {t('originals.material')}
            </span>
            <span className='painting__meta-value'>
              {t(currentPainting.description)}
            </span>
          </div>
          <div className='painting__meta-item'>
            <span className='painting__meta-label'>{t('originals.size')}</span>
            <span className='painting__meta-value'>
              {t(currentPainting.size)}
            </span>
          </div>
          <div className='painting__meta-item'>
            <span className='painting__meta-label'>
              {t('originals.details')}
            </span>
            <span className='painting__meta-value'>
              {t(currentPainting.subDescription)}
            </span>
          </div>
        </div>

        <div className='painting__price'>
          <span className='painting__price-value'>
            {t(currentPainting.price)}
          </span>
          <span className='painting__price-note'>{t('originals.kind')}</span>
        </div>

        <div className='painting__contact-section'>
          <p className='painting__contact-title'>{t('originals.social')}</p>
          <div className='painting__contact'>
            <a
              href={`mailto:${currentPainting.email}`}
              className='painting__contact-link'
            >
              <FaEnvelope />
              {currentPainting.email}
            </a>
            <a
              href={currentPainting.instagram}
              target='_blank'
              rel='noopener noreferrer'
              className='painting__contact-link painting__contact-link--instagram'
            >
              <FaInstagram />
              {instagramHandle}
            </a>
          </div>
        </div>

        <div className='painting__shipping'>
          <p>{t(currentPainting.shipping)}</p>
          <p>{t(currentPainting.international)}</p>
        </div>
      </div>

      {/* Лайтбокс */}
      {galleryOpen && (
        <div
          className='painting__lightbox'
          onClick={() => setGalleryOpen(false)}
        >
          <button
            className='painting__lb-close'
            onClick={() => setGalleryOpen(false)}
          >
            ✕
          </button>

          <div
            className='painting__lb-content'
            onClick={e => e.stopPropagation()}
          >
            <button
              className='painting__lb-arrow painting__lb-arrow--left'
              onClick={prev}
            >
              ‹
            </button>

            <div className='painting__lb-main'>
              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <img src={activeMedia.src} alt='' />
              )}
              <div className='painting__lb-counter'>
                {activeIndex + 1} / {media.length}
              </div>
            </div>

            <button
              className='painting__lb-arrow painting__lb-arrow--right'
              onClick={next}
            >
              ›
            </button>
          </div>

          <div
            className='painting__lb-thumbs'
            onClick={e => e.stopPropagation()}
          >
            {media.map((item, index) => (
              <div
                key={index}
                className={`painting__lb-thumb ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {item.type === 'video' ? (
                  <video src={item.src} />
                ) : (
                  <img src={item.src} alt='' />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
