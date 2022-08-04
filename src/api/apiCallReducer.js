const apiCallReducer = (apiState, action) => {
  switch (action.type) {
    case 'loading':
      return { ...apiState, loading: true };
    case 'success':
      return { ...apiState, data: action.data };
    case 'error':
      return { ...apiState, error: action.error };
    default:
      throw new Error('Unknown action type supplied to apiCallReducer');
  }
};
export default apiCallReducer;
