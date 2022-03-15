import { Link } from "react-router-dom";
import HomeOfficeLogo from "./HomeOfficeLogo";

const Header = () => {
  return (
    <>
      <header
        className='govuk-header'
        style={{
          backgroundColor: "#FFF",
          color: "#000",
          borderBottom: "1px solid #ccc",
        }}
        role='banner'
      >
        <div
          className='govuk-header__container govuk-width-container'
          style={{ borderBottom: 0 }}
        >
          <div className='govuk-header__logo'>
            <HomeOfficeLogo />
          </div>
          <div className='govuk-header__content'>
            <a
              href='#'
              className='govuk-header__link govuk-header__link--service-name'
              style={{ color: "#000" }}
            >
              Callisto
            </a>
            <nav aria-label='Menu' className='govuk-header__navigation '>
              <button
                type='button'
                className='govuk-header__menu-button govuk-js-header-toggle'
                aria-controls='navigation'
                aria-label='Show or hide menu'
              >
                Menu
              </button>

              <ul id='navigation' className='govuk-header__navigation-list'>
                <li className='govuk-header__navigation-item govuk-header__navigation-item--active'>
                  <a
                    className='govuk-header__link'
                    href='#1'
                    style={{ color: "#000" }}
                  >
                    Timecard
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
