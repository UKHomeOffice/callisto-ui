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
    this.params.append('filter', filters.join('&&'));
    return this;
  }

  getUrlSearchParams() {
    return this.params;
  }
}
