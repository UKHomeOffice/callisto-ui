import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const { keycloak } = useKeycloak();

  return (
    <div style={{ display: 'block', float: 'right' }}>
      <nav
        className="govuk-header__navigation"
        aria-label="User profile navigation"
      >
        <ul className="govuk-header__navigation-list-profile">
          {keycloak.authenticated ? (
            <>
              <li className="govuk-header__navigation-item">
                {keycloak.tokenParsed.preferred_username}
              </li>
              <li className="govuk-header__navigation-item">
                <a
                  className="govuk-header__navigation-link govuk-header__link"
                  style={{ color: '#000' }}
                  href={keycloak.createLogoutUrl()}
                >
                  Sign Out
                </a>
              </li>
            </>
          ) : (
            <li className="govuk-header__navigation-item">
              <a
                className="govuk-header__navigation-link"
                href={keycloak.createLoginUrl()}
              >
                Sign In
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SignIn;
