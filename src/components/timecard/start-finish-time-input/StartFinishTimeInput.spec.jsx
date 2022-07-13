import { render, screen } from '@testing-library/react';
import StartFinishTimeInput from './StartFinishTimeInput';

describe('StartFinishTimeInput', () => {
  it('should display titles for each input box', () => {
    render(<StartFinishTimeInput errors={{}} register={jest.fn()} />);

    const startTimeTitle = screen.getByText('Start time');
    const finishTimeTitle = screen.getByText('Finish time');

    expect(startTimeTitle).toBeTruthy();
    expect(finishTimeTitle).toBeTruthy();
  });
});
