import { about, alina2 } from '../../assets/images';
import { useI18n } from '../../i18n';
import './About.scss';

export const About = () => {
  const { t } = useI18n();
  return (
    <div className='about'>
      <div className='about__hero'>
        <img className='about__image' src={about} alt='poster' />
        <h2 className='about__title'>{t('about.title')}</h2>
      </div>

      <div className='about__content'>
        <h2 className='about__description'>{t('about.description')}</h2>
        <p className='about__details'>{t('about.details')}</p>
      </div>

      <div className='about__alina'>
        <img src={alina2} alt='alina' />
        <div className='about__alina--description'>
          <p>{t('about.intro')}</p>
          <p>{t('about.story')}</p>
          <p>{t('about.social')}</p>
          <div className='about__buttons'>
            <a
              className='about__buttons--btn'
              href='https://www.youtube.com/@alisi_art'
              target='_blank'
              rel='noreferrer'
            >
              {t('about.youtube')}
            </a>
            <a
              className='about__buttons--btn'
              href='https://www.instagram.com/alisi.art/'
              target='_blank'
              rel='noreferrer'
            >
              {t('about.instagram')}
            </a>
          </div>
        </div>
      </div>

      <div className='about__video'>
        <iframe
          src='https://www.youtube.com/embed/tCLo0sDyHhE?si=s2yyHEiPk73MIwsa'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        />
      </div>
    </div>
  );
};
