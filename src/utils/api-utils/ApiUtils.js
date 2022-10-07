export const validateServiceErrors = async (
  setServiceError,
  serviceFunction,
  isRecoverable = true
) => {
  try {
    await serviceFunction();
    setServiceError({
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    setServiceError({
      hasError: true,
      recoverable: isRecoverable,
    });
  }
};
