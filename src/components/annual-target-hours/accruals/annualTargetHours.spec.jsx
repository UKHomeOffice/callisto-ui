import { render, screen } from '@testing-library/react';
import AnnualTargetHours from './AnnualTargetHours';
import pretty from 'pretty';

describe('AnnualTargetHours', () => {
  it('should render a table with correct headers', () => {
    const { getByRole, baseElement } = render(
      <AnnualTargetHours targetData={null} accrualsData={null} />
    );

    const table = getByRole('table');
    expect(table).toBeTruthy();

    const headers = ['Total', 'Worked', 'Remaining', 'Target'];

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeTruthy();
    });
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });

  it('should display correct text for remaining hours with targetData', () => {
    const targetData = { targetTotal: 131520 };
    const accrualsData = { cumulativeTotal: 600 };
    const translationKey =
      'Annual target hours\n <strong>{{count}}</strong> remaining';

    const { baseElement } = render(
      <AnnualTargetHours
        targetData={targetData}
        accrualsData={accrualsData}
        translationKey={translationKey}
      />
    );

    expect(screen.getByText('Annual target hours remaining')).toBeTruthy();
    expect(screen.getByText('2182')).toBeTruthy();
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });

  it('should display correct text for remaining hours without targetData', () => {
    const targetData = null;
    const accrualsData = { cumulativeTotal: 500 };

    const { baseElement } = render(
      <AnnualTargetHours targetData={targetData} accrualsData={accrualsData} />
    );

    const expectedText = 'No agreement has been found';

    expect(screen.getByText(expectedText)).toBeTruthy();
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });

  it('should display "-" for headers without targetData', () => {
    const targetData = null;
    const accrualsData = { cumulativeTotal: 100 };

    const { baseElement } = render(
      <AnnualTargetHours targetData={targetData} accrualsData={accrualsData} />
    );

    const expectedText = screen.getAllByText('-');

    expect(expectedText.length).toBe(4);
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });
});
