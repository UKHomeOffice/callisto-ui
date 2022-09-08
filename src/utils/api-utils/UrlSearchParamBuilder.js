export class UrlSearchParamBuilder {
  params = null;

  constructor() {
    this.params = new URLSearchParams();
  }

  setTenantId(tenantId) {
    this.params.append('tenantId', tenantId);
    return this;
  }

  setFilters(...filters) {
    let allFilters = '';
    for (let x = 0; x < filters.length; x++) {
      allFilters += x == 0 ? filters[x] : '&&' + filters[x];
    }
    this.params.append('filter', allFilters);
    return this;
  }

  getUrlSearchParams() {
    return this.params;
  }
}
