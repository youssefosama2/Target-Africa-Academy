import React, { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isArabic]);

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? 'en' : 'ar');
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`navlinks ${isArabic ? 'me-auto' : 'ms-auto'}`}>
            <HashLink className="nav-link" to="/#about">{t('navbar.about')}</HashLink>
            <HashLink className="nav-link" to="/#pricing">{t('navbar.pricing')}</HashLink>
            <HashLink className="nav-link" to="/#player">{t('navbar.stars')}</HashLink>
            <HashLink className="nav-link" to="/#programs">{t('navbar.programs')}</HashLink>
            <HashLink className="nav-link" to="/#joinUs">{t('navbar.join')}</HashLink>
            <button
              className={`lang-toggle ${isArabic ? 'ar' : 'en'}`}
              onClick={toggleLanguage}
            >
              <FontAwesomeIcon icon={faGlobe} />
              <span>{isArabic ? 'EN' : 'AR'}</span>
              <div className="switch-dot"></div>
            </button>
          </Nav>
        </Navbar.Collapse>
        <h3 className="fw-bold">{t('navbar.brand')}</h3>
      </Container>
    </Navbar>
  );
};

export default NavBar;