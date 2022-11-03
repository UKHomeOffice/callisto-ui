import { render } from '@testing-library/react';

import ValidatedTimeEntry from './ValidatedTimeEntry';

describe('ValidatedTimeEntry', () => {
  it('should render start time correctly', () => {
    const component = render(
      <ValidatedTimeEntry
        name="shift-start-time"
        timeType="start time"
        errors={{}}
        register={jest.fn()}
      />
    );

    expect(component).toBeTruthy();
  });

  it('should render finish time correctly', () => {
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
