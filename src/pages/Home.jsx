import { useEffect } from 'react';
import generateDocumentTitle from '../utils/generate-document-title/generateDocumentTitle';
import { useApplicationContext } from '../context/ApplicationContext';

const Home = () => {
  useEffect(() => {
    document.title = generateDocumentTitle('Home');
  });

  return (
    <>
      <h1 className="govuk-heading-xl">Home page</h1>
    </>
  );
};

export default Home;
