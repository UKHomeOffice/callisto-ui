import {
  buildAgreementFilter,
  buildAgreementTargetFilter,
  buildAccrualsFilter,
} from './accrualsFilterBuilder';

const date = '2023-04-01';
const userId = 'a18b6f95-0940-4ec3-bc38-abeb29e039c5';
const agreementId = 'ac160006-8844-154d-8188-4406ed3c0000';

describe('accrualsFilterBuilder', () => {
  it('should create an agreement filter specifying the date range and personId required', () => {
    expect(buildAgreementFilter(date, userId)).toEqual(
      `personId=='${userId}'&&startDate<='${date}'&&endDate>='${date}'`
    );
  });

  it('should create a agreement target filter witht he agreementId provided', () => {
    expect(buildAgreementTargetFilter(agreementId)).toEqual(
      `agreementId=='${agreementId}'`
    );
  });

  it('should create an accruals filter specifying the date and personId required', () => {
    expect(buildAccrualsFilter(date, userId)).toEqual(
      `personId=='${userId}'&&accrualDate=='${date}'`
    );
  });
});
