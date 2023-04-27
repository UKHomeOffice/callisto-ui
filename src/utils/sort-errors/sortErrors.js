export const sortErrors = (errors) => {
  let sortedErrors = [];
  errors.forEach((error) => {
    if (error.errorPriority === 1) {
      sortedErrors = [error, ...sortedErrors];
    } else {
      sortedErrors = [
        ...sortedErrors.slice(0, error.errorPriority - 1),
        error,
        ...sortedErrors.slice(error.errorPriority),
      ];
    }
  });

  return sortedErrors;
};
