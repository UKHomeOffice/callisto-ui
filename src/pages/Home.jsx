import { useEffect } from 'react';
import { getHelloWorld } from '../api/services/timecardService';
import generateDocumentTitle from '../utils/generate-document-title/generateDocumentTitle';
import useApiCall from '../api/useApiCall';

const Home = () => {
  const [loading, data, error] = useApiCall(getHelloWorld);
  useEffect(() => {
    document.title = generateDocumentTitle('Home');
  });
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
