import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ValidatedTimeEntry from './ValidatedTimeEntry';

describe('ValidatedTimeEntry', () => {
    it('should render correctly', () => {
        render(
            <ValidatedTimeEntry timeType="Start Time"/>
        );

        c
        expect(timeType).toBeTruthy();
    });
})