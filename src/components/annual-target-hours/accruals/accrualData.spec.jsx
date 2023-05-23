import { render, screen } from '@testing-library/react';
import AccrualData from './AccrualData';
import pretty from 'pretty';

describe('AccrualData', () => {
  it('should render a table with correct headers', () => {
    const { getByRole, baseElement } = render(
      <AccrualData targetData={null} accrualsData={null} />
    );

    const table = getByRole('table');
    expect(table).toBeTruthy();

    const headers = ['Total', 'Worked', 'Remaining', 'Target'];

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeTruthy();
    });
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });

  it('should display correct title for annual Target Hours', () => {
    const targetData = { targetTotal: 131520 };
    const accrualsData = { cumulativeTotal: 600 };
    const titleTranslationKey = 'annualTargetHours.remainingHoursTitle';

    const { baseElement } = render(
      <AccrualData
        targetData={targetData}
        accrualsData={accrualsData}
        titleTranslationKey={titleTranslationKey}
      />
    );

    expect(screen.getByText('Annual target hours remaining')).toBeTruthy();
    expect(screen.getByText('2182')).toBeTruthy();
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });

  it('should display correct title for night Hours', () => {
    const targetData = { targetTotal: 131520 };
    const accrualsData = { cumulativeTotal: 600 };
    const titleTranslationKey = 'nightHours.remainingHoursTitle';

    const { baseElement } = render(
      <AccrualData
        targetData={targetData}
        accrualsData={accrualsData}
        titleTranslationKey={titleTranslationKey}
      />
    );

    expect(screen.getByText('Night hours remaining')).toBeTruthy();
    expect(screen.getByText('2182')).toBeTruthy();
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });
  it('should display correct text for remaining hours without targetData', () => {
    const targetData = null;
    const accrualsData = { cumulativeTotal: 500 };

    const { baseElement } = render(
      <AccrualData targetData={targetData} accrualsData={accrualsData} />
    );

    const expectedText = 'No agreement has been found';

    expect(screen.getByText(expectedText)).toBeTruthy();
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });

  it('should display "-" for headers without targetData', () => {
    const targetData = null;
    const accrualsData = { cumulativeTotal: 100 };

    const { baseElement } = render(
      <AccrualData targetData={targetData} accrualsData={accrualsData} />
    );

    const expectedText = screen.getAllByText('-');

    expect(expectedText.length).toBe(4);
    expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
  });
});
