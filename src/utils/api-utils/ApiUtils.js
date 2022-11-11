export const validateServiceErrors = async (
  setServiceError,
  serviceFunction,
  handleCustomErrors = () => {},
  isRecoverable = true
) => {
  try {
    await serviceFunction();
    setServiceError({
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    const allErrorsHandled = handleCustomErrors(error?.response?.data?.message);

    if (allErrorsHandled) {
      setServiceError({
        hasError: false,
      });
      return;
    }

    setServiceError({
      hasError: true,
      recoverable: isRecoverable,
    });
  }
};

export const focusErrors = () => {
  const firstSummaryError = document.getElementById('error-summary-title');
  if (firstSummaryError) {
    firstSummaryError.scrollIntoView({
      block: 'center',
      inline: 'center',
      behaviour: 'smooth',
    });
    firstSummaryError.focus();
  }
};
