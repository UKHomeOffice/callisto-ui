export const validateServiceErrors = async (
  setServiceError,
  serviceFunction,
  isRecoverable = true,
  handleCustomErrors = () => {}
) => {
  try {
    await serviceFunction();
    setServiceError({
      hasError: false,
    });
  } catch (error) {
    console.error(error);
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
