import { useKeycloak } from '@react-keycloak/web';

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
                <a className="govuk-header__navigation-link" href="#1">
                  Sign Out
                </a>
              </li>
            </>
          ) : (
            <li className="govuk-header__navigation-item">
              <a className="govuk-header__navigation-link" href="#1">
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>

      {!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
      )}

      {!!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800"
          onClick={() => keycloak.logout()}
        >
          Logout ({keycloak.tokenParsed.preferred_username})
        </button>
      )}
    </div>
  );
};

export default SignIn;
