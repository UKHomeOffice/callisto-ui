const Home = () => {

  const { initialized, keycloak } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated){
      keycloak.login();
    }
  });

  return <h1 className="govuk-heading-xl">Home page</h1>;
};

export default Home;
