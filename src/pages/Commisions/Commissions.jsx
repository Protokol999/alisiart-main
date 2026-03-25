import { commissions } from '../../assets/images';
import { useI18n } from '../../i18n';
import './Commissions.scss';

export const Commissions = () => {
  const { t } = useI18n();
  return (
    <div className='commissions'>
      <div className='commissions__hero'>
        <img
          className='commissions__image'
          src={commissions}
          alt='commissions'
        />
        <h2 className='commissions__title'>{t('commissions.title')}</h2>
      </div>

      <div className='commissions__content'>
        <p className='commissions__description'>
          {t('commissions.description')}
        </p>
        <p className='commissions__details'>{t('commissions.details')}</p>
        <p className='commissions__contact'>{t('commissions.contact')}</p>
        <a
          className='commissions__button'
          href='mailto:alisiartstudio@gmail.com'
        >
          {t('commissions.emailButton')}
        </a>
      </div>
    </div>
  );
};
