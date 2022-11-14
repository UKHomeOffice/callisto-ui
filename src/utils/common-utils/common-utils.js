export const deepCloneJson = (objectOrArray) => {
  return JSON.parse(JSON.stringify(objectOrArray));
};

export const focusErrors = (firstSummaryError) => {
  if (firstSummaryError) {
    firstSummaryError.scrollIntoView({
      block: 'center',
      inline: 'center',
      behaviour: 'smooth',
    });
    firstSummaryError.focus();
  }
};
