import { UrlSearchParamBuilder } from './UrlSearchParamBuilder';

describe('UrlSearchParamBuilder', () => {
  describe('setFilters', () => {
    it('should apply a single filter to the filter parameter if only one filter is provided', () => {
      let urlSearchParamBuilder = new UrlSearchParamBuilder();
      let filter = 'propertyA==5';
      urlSearchParamBuilder.setFilters(filter);
      expect(urlSearchParamBuilder.getUrlSearchParams().get('filter')).toEqual(
        filter
      );
    });

    it('should apply all filters to the filter parameter if multiple parameters are provided', () => {
      let urlSearchParamBuilder = new UrlSearchParamBuilder();
      let filter1 = 'propertyA==5';
      let filter2 = 'propertyB==9';
      urlSearchParamBuilder.setFilters(filter1, filter2);
      expect(urlSearchParamBuilder.getUrlSearchParams().get('filter')).toEqual(
        'propertyA==5&&propertyB==9'
      );
    });
  });
});
