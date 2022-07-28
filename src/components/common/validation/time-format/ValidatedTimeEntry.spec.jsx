import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ValidatedTimeEntry from './ValidatedTimeEntry';

describe('ValidatedTimeEntry', () => {
  it('should render correctly', () => {
    const component = render(
      <ValidatedTimeEntry
        name="start-time"
        timeType="start time"
        errors={{}}
        register={jest.fn()}
      />
    );

    expect(component).toBeTruthy();
  });
});
