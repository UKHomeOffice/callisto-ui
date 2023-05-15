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

it('should display correct text for remaining hours with targetData', () => {
  const targetData = { targetTotal: 200 };
  const accrualsData = { cumulativeTotal: 100 };

  render(
    <AnnualTargetHours targetData={targetData} accrualsData={accrualsData} />
  );

  const remaining = targetData.targetTotal - accrualsData.cumulativeTotal;
  const expectedText = `Annual target hours ${remaining} remaining`;

  expect(screen.getByText(expectedText)).toBeTruthy();
});

it('should display correct text for remaining hours without targetData', () => {
  const targetData = null;
  const accrualsData = { cumulativeTotal: 100 };

  render(
    <AnnualTargetHours targetData={targetData} accrualsData={accrualsData} />
  );

  const expectedText = 'No agreement has been found';

  expect(screen.getByText(expectedText)).toBeTruthy();
});
