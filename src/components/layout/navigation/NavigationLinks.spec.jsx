import {
  renderWithApplicationContext,
  defaultApplicationContext,
} from '../../../test/helpers/TestApplicationContext';
import i18n from 'i18next';
import NavigationLinks from './NavigationLinks';

const t = i18n.getFixedT('en', 'common');

describe('Navigation Links', () => {
  it('should contain a link to previous day', () => {
    const { getByRole } = renderWithApplicationContext(
      <NavigationLinks
        url={'accruals'}
        previousDay={'2022-06-30'}
        nextDay={'2022-07-02'}
      />,
      defaultApplicationContext,
      '/2022-07-01',
      '/:date'
    );

    const previousDayLink = getByRole('link', {
      name: t('navigation.previousDay'),
    });
    expect(previousDayLink.pathname).toBe('/accruals/2022-06-30');
  });

  it('should contain a link to next day', () => {
    const { getByRole } = renderWithApplicationContext(
      <NavigationLinks
        url={'timecard'}
        previousDay={'2022-06-30'}
        nextDay={'2022-07-02'}
      />,
      defaultApplicationContext,
      '/2022-07-01',
      '/:date'
    );

    const nextDayLink = getByRole('link', { name: t('navigation.nextDay') });
    expect(nextDayLink.pathname).toBe('/timecard/2022-07-02');
  });
});
