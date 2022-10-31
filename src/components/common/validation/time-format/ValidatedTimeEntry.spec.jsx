import { render } from '@testing-library/react';

import ValidatedTimeEntry from './ValidatedTimeEntry';

describe('ValidatedTimeEntry', () => {
  it('should render correctly', () => {
    const component = render(
      <ValidatedTimeEntry
        name="shift-finish-time"
        timeType="finish time"
        errors={{}}
        register={jest.fn()}
      />
    );

    expect(component).toBeTruthy();
  });
});
