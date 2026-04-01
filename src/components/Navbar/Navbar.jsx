import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n';
import './Navbar.scss';

export const Navbar = () => {
  const { language, setLanguage, t } = useI18n();
  const nextLanguage = language === 'en' ? 'ru' : 'en';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Появление фона при скролле
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрывать меню при ресайзе до десктопа
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Блокировать скролл когда меню открыто
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}`}
    >
      {/* Десктоп */}
      <div className='navbar__list'>
        <NavLink to='/'>{t('navbar.home')}</NavLink>
        <NavLink to='/originals'>{t('navbar.originals')}</NavLink>
        <NavLink to='/prints'>{t('navbar.prints')}</NavLink>
        <NavLink to='/commissions'>{t('navbar.commissions')}</NavLink>
        <NavLink to='/about'>{t('navbar.about')}</NavLink>
        <NavLink to='/contact'>{t('navbar.contact')}</NavLink>
      </div>

      <button
        type='button'
        className='navbar__language-toggle'
        aria-label={t('navbar.language')}
        onClick={() => setLanguage(nextLanguage)}
      >
        <span className={language === 'en' ? 'is-active' : ''}>EN</span>
        <span className='navbar__language-divider'>/</span>
        <span className={language === 'ru' ? 'is-active' : ''}>RU</span>
      </button>

      {/* Бургер кнопка */}
      <button
        className={`navbar__burger${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label='Menu'
      >
        <span />
        <span />
        <span />
      </button>

      {/* Мобильное меню */}
      <div className={`navbar__mobile${menuOpen ? ' is-open' : ''}`}>
        <NavLink to='/' onClick={close}>
          {t('navbar.home')}
        </NavLink>
        <NavLink to='/originals' onClick={close}>
          {t('navbar.originals')}
        </NavLink>
        <NavLink to='/prints' onClick={close}>
          {t('navbar.prints')}
        </NavLink>
        <NavLink to='/commissions' onClick={close}>
          {t('navbar.commissions')}
        </NavLink>
        <NavLink to='/about' onClick={close}>
          {t('navbar.about')}
        </NavLink>
        <NavLink to='/contact' onClick={close}>
          {t('navbar.contact')}
        </NavLink>

        <button
          type='button'
          className='navbar__language-toggle'
          onClick={() => {
            setLanguage(nextLanguage);
            close();
          }}
        >
          <span className={language === 'en' ? 'is-active' : ''}>EN</span>
          <span className='navbar__language-divider'>/</span>
          <span className={language === 'ru' ? 'is-active' : ''}>RU</span>
        </button>
      </div>

      {/* Оверлей */}
      {menuOpen && <div className='navbar__overlay' onClick={close} />}
    </nav>
  );
};
