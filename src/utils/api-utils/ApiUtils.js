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
    console.log(error?.response?.data);
    const allErrorsHandled = handleCustomErrors(error?.response?.data);

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
