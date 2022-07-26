import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { TimecardProvider } from '../context/TimecardContext';

export const renderWithProviders = (Component, AuthClientStub) =>
  render(
    <ReactKeycloakProvider authClient={AuthClientStub}>
      <BrowserRouter>{Component}</BrowserRouter>
    </ReactKeycloakProvider>
  );

// export const MockTimecardProvider = ({
//   component,
//   values = {
//     summaryErrors: {},
//     setSummaryErrors: jest.fn(),
//     timecardData: {
//       startTime: '',
//       finishTime: '',
//     },
//     setTimecardData: jest.fn(),
//   },
// }) => {
//   const [summaryErrors, setSummaryErrors] = useState({});
//   const [timecardData, setTimecardData] = useState({
//     timePeriodType: '',
//     startTime: '',
//     finishTime: '',
//   });

//   const value = {
//     summaryErrors,
//     setSummaryErrors,
//     timecardData,
//     setTimecardData,
//   };

//   return (
//     <TimecardContext.Provider value={values}>
//       {component}
//     </TimecardContext.Provider>
//   );
// };

export const renderWithTimecardContext = (
  Component,
  values = {
    summaryErrors: {},
    setSummaryErrors: jest.fn(),
    timecardData: {
      startTime: '',
      finishTime: '',
    },
    setTimecardData: jest.fn(),
  }
) => {
  return {
    ...render(
      <TimecardProvider>
        <MemoryRouter>{Component}</MemoryRouter>
      </TimecardProvider>
    ),
  };
};

export const renderWithRouter = (
  Component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(<BrowserRouter history={history}>{Component}</BrowserRouter>),
    history,
  };
};
