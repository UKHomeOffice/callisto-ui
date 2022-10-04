export const validateServiceErrors = async (
  setServiceError,
  serviceFunction
) => {
  try {
    await serviceFunction();
    setServiceError(false);
  } catch (error) {
    console.error(error);
    setServiceError(true);
  }
};
