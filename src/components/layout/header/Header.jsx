import HomeOfficeLogo from './HomeOfficeLogo';
import PhaseBanner from '../phase-banner/PhaseBanner';
import React, { useState } from 'react';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <header
        className="govuk-header"
        style={{
          backgroundColor: '#FFF',
          color: '#000',
        }}
        role="banner"
      >
        <div
          className="govuk-header__container govuk-width-container"
          style={{ borderBottom: 0 }}
        >
          <div className="govuk-header__logo">
            <HomeOfficeLogo />
          </div>
          <div className="govuk-header__content">
            <button
              type="button"
              className={`govuk-header__menu-button govuk-js-header-toggle ${
                toggleMenu && 'govuk-header__menu-button--open'
              }`}
              aria-controls="navigation"
              aria-label="Show or hide menu"
              style={{ color: 'black' }}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              Menu
            </button>
            <a
              href="#"
              className="govuk-header__link govuk-header__link--service-name"
              style={{ color: '#000' }}
            >
              Callisto
            </a>
          </div>
        </div>
        <div
          className="govuk-header__container govuk-width-container"
          style={{ borderBottom: 0 }}
        >
          <PhaseBanner />

          <nav aria-label="Menu" className="govuk-header__navigation ">
            <ul
              id="navigation"
              className={`govuk-header__navigation-list govuk-!-margin-top-1 ${
                toggleMenu && 'govuk-header__navigation-list--open'
              }`}
            >
              <li className="govuk-header__navigation-item govuk-header__navigation-item govuk-!-margin-right-5">
                <a
                  className="govuk-header__link"
                  href="/"
                  style={{ color: 'black' }}
                >
                  Home
                </a>
              </li>
              <li className="govuk-header__navigation-item govuk-header__navigation-item">
                <a
                  className="govuk-header__link"
                  href="/timecard"
                  style={{ color: '#000' }}
                >
                  Timecard
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
