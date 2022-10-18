export const validateServiceErrors = async (
  setServiceError,
  serviceFunction,
  handleErrors,
  isRecoverable = true
) => {
  try {
    await serviceFunction();
    setServiceError({
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    console.log(error.response);
    if (error?.response?.status === 400) {
      handleErrors();
    } else {
      setServiceError({
        hasError: true,
        recoverable: isRecoverable,
      });
    }
  }
};
