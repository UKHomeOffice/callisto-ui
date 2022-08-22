const apiCallReducer = (apiState, action) => {
  switch (action.type) {
    case 'loading':
      return { ...apiState, loading: true };
    case 'success':
      return { ...apiState, loading: false, data: action.data };
    case 'error':
      return { ...apiState, loading: false, error: action.error };
    default:
      throw new Error('Unknown action type supplied to apiCallReducer');
  }
};
export default apiCallReducer;
