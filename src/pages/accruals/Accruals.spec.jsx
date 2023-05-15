import { fireEvent, screen, waitFor } from '@testing-library/react';
import {
  renderWithApplicationContext,
  defaultApplicationContext,
} from '../../test/helpers/TestApplicationContext';
import Accruals from './Accruals';
import i18n from 'i18next';
import {
  getAgreements,
  getAgreementTargets,
  getAccruals,
} from '../../api/services/accrualsService';
import {
  agreement,
  agreementTarget,
  annualTargetHoursAccrual,
} from '../../../mocks/mockData';
import pretty from 'pretty';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const t = i18n.getFixedT('en', 'common');

jest.mock('../../api/services/accrualsService');
beforeEach(() => {
  getAgreements.mockImplementation(() => {
    return {
      status: 200,
      data: agreement,
    };
  });
  getAgreementTargets.mockImplementation(() => {
    return {
      status: 200,
      data: agreementTarget,
    };
  });
  getAccruals.mockImplementation(() => {
    return {
      status: 200,
      data: annualTargetHoursAccrual,
    };
  });
});

describe('Accruals', () => {
  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      const { getByRole } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2022-07-01',
        '/:date'
      );

      const previousDayLink = getByRole('link', {
        name: t('accruals.previousDay'),
      });
      expect(previousDayLink.pathname).toBe('/accruals/2022-06-30');
      fireEvent.click(previousDayLink);
    });

    it('should contain a link to next day', () => {
      const { getByRole } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2022-07-01',
        '/:date'
      );

      const nextDayLink = getByRole('link', { name: t('accruals.nextDay') });
      expect(nextDayLink.pathname).toBe('/accruals/2022-07-02');
      fireEvent.click(nextDayLink);
    });
  });

  describe('getAcrrualsData', () => {
    it('should retrieve all data when viewing a date in the agreement range', async () => {
      const { baseElement } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2023-04-01',
        '/:date'
      );

      await waitFor(async () => {
        expect(screen.getByText('Annual target hours remaining')).toBeTruthy();
        expect(screen.getByText('2182')).toBeTruthy();
        expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
      });
    });

    it('should retrieve no data when viewing a date outside the agreement range', async () => {
      getAgreements.mockImplementation(() => {
        return {
          status: 200,
          data: [],
        };
      });
      const { baseElement } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2023-04-08',
        '/:date'
      );

      await waitFor(async () => {
        expect(screen.getByText('No agreement has been found')).toBeTruthy();
        expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
      });
    });

    it('should find an agreement but no target and shows no data dound', async () => {
      getAgreementTargets.mockImplementation(() => {
        return {
          status: 200,
          data: [],
        };
      });
      const { baseElement } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2023-04-07',
        '/:date'
      );

      await waitFor(async () => {
        expect(screen.getByText('No agreement has been found')).toBeTruthy();
        expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
      });
    });

    it('should find an agreement and target but no accrual but still renders the found data and zero worked', async () => {
      getAccruals.mockImplementation(() => {
        return {
          status: 200,
          data: [],
        };
      });
      const { baseElement } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2023-04-07',
        '/:date'
      );

      await waitFor(async () => {
        expect(screen.getByText('Annual target hours remaining')).toBeTruthy();
        expect(screen.getByText('2192')).toBeTruthy();
        expect(screen.getByText('00:00')).toBeTruthy();
        expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
      });
    });
  });
});
