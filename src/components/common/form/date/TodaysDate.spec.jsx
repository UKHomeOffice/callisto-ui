import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodaysDate from './TodaysDate';
// import i18n from '../../../../i18n/config';
// import { I18nextProvider } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
  initReactI18next: { type: '3rdParty', init: jest.fn() },
}));

test('date is showing on page', () => {
  render(<TodaysDate />);

  const date = screen.getByTestId('date');
  expect(date).toBeInTheDocument();
});

// test('date renders in specific lanaguage', () => {
//   const c = render(
//     <I18nextProvider i18n={i18n}>
//       <TodaysDate />
//     </I18nextProvider>
//   );

//   expect(
//     c.getByText(i18n.getDataByLanguage('en').translation.todaysDate)
//   ).toBeDefined();
// });
