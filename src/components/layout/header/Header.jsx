import HomeOfficeLogo from './HomeOfficeLogo';
import PhaseBanner from '../phase-banner/PhaseBanner';
import { useState } from 'react';
import SignIn from './SignIn';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { formatDate } from '../../../utils/time-entry-utils/timeEntryUtils';
import { HashLink } from 'react-router-hash-link';

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
        <HashLink
          to="#main-content"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </HashLink>
        <div
          className="govuk-header__container govuk-width-container"
          style={{ borderBottom: 0 }}
        >
          <div className="govuk-header__logo govuk-!-margin-top-1 govuk-!-margin-bottom-0">
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
            <Link
              to="/"
              className="govuk-header__link govuk-header__link--service-name govuk-!-margin-top-2"
              style={{ color: '#000' }}
            >
              Callisto
            </Link>
            <SignIn />
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
              <li
                data-testid="header-home-link"
                className="govuk-header__navigation-item govuk-header__navigation-item govuk-!-margin-right-5"
              >
                <Link
                  className="govuk-header__link"
                  to="/"
                  style={{ color: 'black' }}
                  id="header-home-link"
                >
                  Home
                </Link>
              </li>
              <li
                data-testid="header-record-time-link"
                className="govuk-header__navigation-item govuk-header__navigation-item"
              >
                <Link
                  className="govuk-header__link"
                  to={`/timecard/${formatDate(dayjs())}`}
                  style={{ color: '#000' }}
                  id="header-record-time-link"
                >
                  Record my time
                </Link>
              </li>
              <li
                data-testid="header-track-time-link"
                className="govuk-header__navigation-item govuk-header__navigation-item"
              >
                <Link
                  className="govuk-header__link"
                  to={`/accruals/${formatDate(dayjs())}`}
                  style={{ color: '#000' }}
                  id="header-track-time-link"
                >
                  Track my time
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
