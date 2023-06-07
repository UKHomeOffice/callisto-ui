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

const getMockAccrual = (accrualTypeId) => {
  let data = annualTargetHoursAccrual;
  data.items[0].accrualTypeId = accrualTypeId;
  return data;
};

const getMockAgreementTarget = (accrualTypeId) => {
  let data = targetHoursAgreementTarget;
  data.items[0].accrualTypeId = accrualTypeId;
  return data;
};

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

  test.each([
    {
      id: 'e502eebb-4663-4e5b-9445-9a20441c18d9',
      title: 'Annual target hours remaining',
    },
    {
      id: '5f06e6ce-1422-4a0c-89dd-f4952e735202',
      title: 'Night hours remaining',
    },
    {
      id: '05bbd915-e907-4259-a2e2-080d7956afec',
      title: 'Weekend hours remaining',
    },
    {
      id: '2a5ea69d-1a2c-409d-b430-43a5dbc403b3',
      title: 'On call weekday periods remaining',
    },
    {
      id: '787d2d12-2aff-4253-b382-bcefded61124',
      title: 'Public holiday hours credit remaining',
    },
    {
      id: 'b94bb25a-7fe2-4599-91ab-f0d58e013aed',
      title: 'Public holiday hours remaining',
    },
    {
      id: 'df4c4b08-ac4a-45e0-83bb-856d3219a8b3',
      title: 'On call weekend periods remaining',
    },
    {
      id: 'c4fd5435-8239-4f1f-9c4b-7f458b7b636d',
      title: 'Flexible changes remaining',
    },
    {
      id: 'c73030ed-ed28-4d59-85e8-185f70d85a94',
      title: 'Rostered Shift Allowance',
    },
    {
      id: 'a628bf34-d834-437d-a57a-ed549bd9a330',
      title: 'On call public holiday period remaining',
    },
    {
      id: 'totallyWrongAccrualsId',
      title: 'Unknown accrual found',
    },
  ])(
    'should render the correct accruals title based open each type ID',
    async (accrualsType) => {
      getAccruals.mockImplementation(() => {
        return {
          status: 200,
          data: getMockAccrual(accrualsType.id),
        };
      });
      getAgreementTargets.mockImplementation(() => {
        return {
          status: 200,
          data: getMockAgreementTarget(accrualsType.id),
        };
      });
      const { baseElement } = renderWithApplicationContext(
        <Accruals />,
        defaultApplicationContext,
        '/2023-04-01',
        '/:date'
      );

      await waitFor(async () => {
        expect(screen.getByText(accrualsType.title)).toBeTruthy();
        expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
      });
    }
  );
});
