import { joinAndConditions } from '../filters/resource-filter-builder/resourceFilterBuilder';
import { UrlSearchParamBuilder } from './UrlSearchParamBuilder';

describe('UrlSearchParamBuilder', () => {
  describe('setFilters', () => {
    it('should apply a single filter to the filter parameter if only one filter is provided', () => {
      const urlSearchParamBuilder = new UrlSearchParamBuilder();
      const filter = 'propertyA==5';
      urlSearchParamBuilder.setFilters(filter);
      expect(urlSearchParamBuilder.getUrlSearchParams().get('filter')).toEqual(
        filter
      );
    });

    it('should apply all filters to the filter parameter if multiple parameters are provided', () => {
      const urlSearchParamBuilder = new UrlSearchParamBuilder();
      const filter = joinAndConditions('propertyA==5', 'propertyB==9');
      urlSearchParamBuilder.setFilters(filter);
      expect(urlSearchParamBuilder.getUrlSearchParams().get('filter')).toEqual(
        'propertyA==5&&propertyB==9'
      );
    });
  });
});
