import { prints } from '../../assets/images';
import { useI18n } from '../../i18n';
import './Prints.scss';

export const Prints = () => {
  const { t } = useI18n();
  return (
    <div className='prints'>
      <div className='prints__hero'>
        <img className='prints__image' src={prints} alt='prints' />
        <div className='prints__hero-overlay'>
          <h1 className='prints__title'>{t('prints.title')}</h1>
        </div>
      </div>
      <div className='prints__content'>
        <p className='prints__description'>{t('prints.description')}</p>
      </div>
    </div>
  );
};
