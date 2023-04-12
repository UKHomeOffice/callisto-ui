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

export const sortErrors = (errors) => {
  return errors.sort((a, b) => {
    if (a.errorPriority !== b.errorPriority) {
      return a.errorPriority - b.errorPriority;
    } else {
      const aField = a.inputName.split('-')[1];
      const bField = b.inputName.split('-')[1];
      if (aField === 'day') {
        return -1;
      } else if (bField === 'day') {
        return 1;
      } else if (aField === 'month') {
        return -1;
      } else if (bField === 'month') {
        return 1;
      } else {
        return 0;
      }
    }
  });
};