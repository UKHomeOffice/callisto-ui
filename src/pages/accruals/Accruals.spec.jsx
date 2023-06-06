import { screen, waitFor } from '@testing-library/react';
import {
  renderWithApplicationContext,
  defaultApplicationContext,
} from '../../test/helpers/TestApplicationContext';
import Accruals from './Accruals';
import {
  getAgreements,
  getAgreementTargets,
  getAccruals,
} from '../../api/services/accrualsService';
import {
  agreement,
  targetHoursAgreementTarget,
  annualTargetHoursAccrual,
  nightHoursAccrual,
  weekendHoursAccrual,
  nightHoursAgreementTarget,
  weekendHoursAgreementTarget,
} from '../../../mocks/mockData';
import pretty from 'pretty';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

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
      data: targetHoursAgreementTarget,
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
  describe('getAccrualsData', () => {
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

    it('should show no data found when there is no agreement data', async () => {
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
  });

  it('should retrieve all night hours data when viewing one in the agreement range', async () => {
    getAccruals.mockImplementation(() => {
      return {
        status: 200,
        data: nightHoursAccrual,
      };
    });
    getAgreementTargets.mockImplementation(() => {
      return {
        status: 200,
        data: nightHoursAgreementTarget,
      };
    });
    const { baseElement } = renderWithApplicationContext(
      <Accruals />,
      defaultApplicationContext,
      '/2023-04-01',
      '/:date'
    );

    await waitFor(async () => {
      expect(screen.getByText('Night hours remaining')).toBeTruthy();
      expect(screen.getByText('21')).toBeTruthy();
      expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
    });
  });
  it('should retrieve all weekend hours data when viewing one in the agreement range', async () => {
    getAccruals.mockImplementation(() => {
      return {
        status: 200,
        data: weekendHoursAccrual,
      };
    });
    getAgreementTargets.mockImplementation(() => {
      return {
        status: 200,
        data: weekendHoursAgreementTarget,
      };
    });
    const { baseElement } = renderWithApplicationContext(
      <Accruals />,
      defaultApplicationContext,
      '/2023-04-01',
      '/:date'
    );

    await waitFor(async () => {
      expect(screen.getByText('Weekend hours remaining')).toBeTruthy();
      expect(screen.getByText('2182')).toBeTruthy();
      expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
    });
  });
});
