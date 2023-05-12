import { fireEvent, screen, render } from '@testing-library/react';
import {
  renderWithApplicationContext,
  defaultApplicationContext,
} from '../../test/helpers/TestApplicationContext';
import Accruals from './Accruals';
import i18n from 'i18next';
import '../../i18n';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const t = i18n.getFixedT('en', 'common');

describe('Accruals', () => {

  describe('navigation', () => {
    it('should contain a link to previous day', () => {
      const { getByRole } = renderWithApplicationContext(<Accruals />,
      defaultApplicationContext,
      '/2022-07-01',
      '/:date');
      
      const previousDayLink = getByRole('link', { name: t('accruals.previousDay')});
      expect(previousDayLink.pathname).toBe('/accruals/2022-06-30');
      fireEvent.click(previousDayLink);
    });

    it('should contain a link to next day', () => {
      const { getByRole } = renderWithApplicationContext(<Accruals />,
      defaultApplicationContext,
      '/2022-07-01',
      '/:date');

      const nextDayLink = getByRole('link', { name: t('accruals.nextDay') });
      expect(nextDayLink.pathname).toBe('/accruals/2022-07-02');
      fireEvent.click(nextDayLink);
    });
  });
});
