import apiCallReducer from './apiCallReducer';

const initialApiState = {
  loading: false,
  data: null,
  error: null,
};

describe('apiCallReducer', () => {
  it('should return loading, data and error properties for any input action type', () => {
    const result = apiCallReducer(initialApiState, { type: 'loading' });
    expect(result).toEqual(
      expect.objectContaining({
        loading: expect.any(Boolean),
        data: expect.any(Object),
        error: expect.any(Object),
      })
    );
  });

  it('should return loading as true when the input action type is "loading"', () => {
    const result = apiCallReducer(initialApiState, { type: 'loading' });
    expect(result).toEqual(expect.objectContaining({ loading: true }));
  });

  it('should return data when the input action type is "success"', () => {
    const data = {
      meta: {
        next: null,
      },
      items: [],
    };

    const result = apiCallReducer(initialApiState, {
      type: 'success',
      data,
    });

    expect(result.data).toEqual(expect.objectContaining({ items: [] }));
    expect(result).toEqual(expect.objectContaining({ error: null }));
    expect(result).toEqual(expect.objectContaining({ loading: false }));
  });

  it('should return an error when the input action type is "error"', () => {
    const result = apiCallReducer(initialApiState, {
      type: 'error',
      error: { message: 'ohno' },
    });
    expect(result.error).toEqual(expect.objectContaining({ message: 'ohno' }));
    expect(result).toEqual(expect.objectContaining({ loading: false }));
    expect(result).toEqual(expect.objectContaining({ data: null }));
  });

  it('should throw an error message for an unknown action type', () => {
    try {
      apiCallReducer(initialApiState, { type: 'fromage' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
