import { render, screen } from '@testing-library/react';
import AnnualTargetHours from './AnnualTargetHours';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { withTranslation, useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import '../../../i18n';

const t = i18n.getFixedT('en', 'common');

describe('AnnualTargetHours', () => {
  it('should render a table with correct headers', () => {
    const { getByRole, baseElement } = render(
      <AnnualTargetHours targetData={null} accrualsData={null} />
    );

    const table = getByRole('table');
    expect(table).toBeTruthy();

    expect(baseElement.innerHTML).toMatchSnapshot();
  });
});

it('should render a table with en-gb headers', () => {
  const { getByRole } = render(
    <AnnualTargetHours targetData={null} accrualsData={null} />
  );

  const table = getByRole('table');
  expect(table).toBeTruthy();

  const headers = ['Total', 'Worked', 'Remaining', 'Target'];

  headers.map((header) => {
    expect(screen.getByText(header)).toBeTruthy();
  });
});
