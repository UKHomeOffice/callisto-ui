export const validateServiceErrors = async (
  setServiceError,
  serviceFunction,
  isRecoverable = true,
  handleErrors
) => {
  try {
    await serviceFunction();
    setServiceError({
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    console.log(error.response);
    if (error?.response?.status === 400 && handleErrors) {
      handleErrors(error?.response?.data);
    } else {
      setServiceError({
        hasError: true,
        recoverable: isRecoverable,
      });
    }
  }
};
