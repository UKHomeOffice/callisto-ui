import { useEffect } from 'react';
import { getHelloWorld } from '../api/services/accrualsService';
import useApiCall from '../api/useApiCall';
import generateDocumentTitle from '../utils/generate-document-title/generateDocumentTitle';

const Home = () => {
  useEffect(() => {
    document.title = generateDocumentTitle('Home');
  });
  const [loading, data, error] = useApiCall(getHelloWorld);

  let apiResponse, apiError;
  const loadingText = ' loading...';

  if (error) {
    apiError = error.message;
  } else {
    if (data) {
      apiResponse = data.data;
    }
  }

  return (
    <>
      <h1 className="govuk-heading-xl">Home page</h1>

      {loading && <p>{loadingText}</p>}
      <p style={{ color: 'white' }}>{apiError}</p>
      <p>{apiResponse}</p>
    </>
  );
};

export default Home;
