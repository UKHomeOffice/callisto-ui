import { useEffect } from 'react';
import generateDocumentTitle from '../utils/generateDocumentTitleUtil';

const Home = () => {
  useEffect(() => {
    document.title = generateDocumentTitle('Home');
  });

  return <h1 className="govuk-heading-xl">Home page</h1>;
};

export default Home;
