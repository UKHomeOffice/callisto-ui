export const validateServiceErrors = async (
  setServiceError,
  serviceFunction,
  isRecoverable
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
      recoverable: isRecoverable !== undefined ? isRecoverable : true,
    });
  }
};
