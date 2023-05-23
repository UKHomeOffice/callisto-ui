export const buildAccrualsFilter = (date, userId) => {
  return `personId=='${userId}'&&accrualDate=='${date}'`;
};

export const buildAgreementFilter = (date, userId) => {
  return `personId=='${userId}'&&startDate<='${date}'&&endDate>='${date}'`;
};

export const buildAgreementTargetFilter = (agreementId) => {
  return `agreementId=='${agreementId}'`;
};
