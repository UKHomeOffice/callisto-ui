import {
  getAccruals,
  getAgreements,
  getAgreementTargets,
} from './accrualsService';
import api from '../core';
import {
  agreement,
  targetHoursAgreementTarget,
  annualTargetHoursAccrual,
} from '../../../mocks/mockData';

jest.mock('../core');

describe('Accruals Service', () => {
  describe('getAgreements', () => {
    it('should return data correctly on success', async () => {
      api.get.mockImplementation(() => Promise.resolve({ data: agreement }));

      const response = await getAgreements();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/agreements'),
        undefined
      );
      expect(response.data.meta).toBeDefined();
      expect(response.data.items).toBeDefined();
      expect(response.data.items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual(agreement);
    });

    it('should use correct endpoint /agreements', async () => {
      api.get.mockImplementation(() => Promise.resolve({ data: agreement }));

      await getAgreements();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/agreements'),
        undefined
      );
    });

    it('should throw useful error containing throwing service and function when an error occurs', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getAgreements();
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Accruals Service');
        expect(error.message).toContain('getAgreements');
        expect(error.message).toContain('xyz');
      }
    });
  });

  describe('getAgreementTargets', () => {
    it('should return data correctly on success', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({ data: targetHoursAgreementTarget })
      );

      const response = await getAgreementTargets();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/agreement-targets'),
        undefined
      );
      expect(response.data.meta).toBeDefined();
      expect(response.data.items).toBeDefined();
      expect(response.data.items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual(targetHoursAgreementTarget);
    });

    it('should use correct endpoint /agreement-targets', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({ data: targetHoursAgreementTarget })
      );

      await getAgreementTargets();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/agreement-targets'),
        undefined
      );
    });

    it('should throw useful error containing throwing service and function when an error occurs', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getAgreementTargets();
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Accruals Service');
        expect(error.message).toContain('getAgreementTargets');
        expect(error.message).toContain('xyz');
      }
    });
  });

  describe('getAccruals', () => {
    it('should return data correctly on success', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({ data: annualTargetHoursAccrual })
      );

      const response = await getAccruals();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/accruals'),
        undefined
      );
      expect(response.data.meta).toBeDefined();
      expect(response.data.items).toBeDefined();
      expect(response.data.items.length).toBeGreaterThan(0);
      expect(response.data).toStrictEqual(annualTargetHoursAccrual);
    });

    it('should use correct endpoint /accruals', async () => {
      api.get.mockImplementation(() =>
        Promise.resolve({ data: annualTargetHoursAccrual })
      );

      await getAccruals();

      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/accruals'),
        undefined
      );
    });

    it('should throw useful error containing throwing service and function when an error occurs', async () => {
      api.get.mockImplementation(() => {
        throw new Error('xyz');
      });

      try {
        const response = await getAccruals();
        expect(response).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Accruals Service');
        expect(error.message).toContain('getAccruals');
        expect(error.message).toContain('xyz');
      }
    });
  });
});
