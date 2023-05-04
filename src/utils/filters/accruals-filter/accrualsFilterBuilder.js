export const buildAccrualsFilter = (date) => {
  return `accrualDate=='${date}'`;
};

export const buildAgreementFilter = (date) => {
  return `startDate<='${date}'&endDate>='${date}'`;
};
