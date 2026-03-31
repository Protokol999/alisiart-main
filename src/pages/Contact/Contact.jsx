import { contact } from '../../assets/images';
import { useI18n } from '../../i18n';
import './Contact.scss';

export const Contact = () => {
  const { t } = useI18n();
  return (
    <div className='contact'>
      <div className='contact__hero'>
        <img className='contact__image' src={contact} alt='contact' />
        <h2 className='contact__title'>{t('contact.title')}</h2>
      </div>

      <div className='contact__content'>
        <div className='contact__buttons'>
          <a className='contact__btn' href='mailto:alisiartstudio@gmail.com'>
            {t('contact.email')}
          </a>
          <a
            className='contact__btn'
            href='https://www.youtube.com/@alisi_art'
            target='_blank'
            rel='noreferrer'
          >
            {t('contact.youtube')}
          </a>
          <a
            className='contact__btn'
            href='https://www.instagram.com/alisi.art/'
            target='_blank'
            rel='noreferrer'
          >
            {t('contact.instagram')}
          </a>
          <a
            className='contact__btn'
            href='https://www.tiktok.com/@alisi.art'
            target='_blank'
            rel='noreferrer'
          >
            {t('contact.tiktok')}
          </a>
        </div>
      </div>
    </div>
  );
};
