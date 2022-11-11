export class UrlSearchParamBuilder {
  params = null;

  constructor() {
    this.params = new URLSearchParams();
  }

  setTenantId(tenantId) {
    this.params.append('tenantId', tenantId);
    return this;
  }

  setFilters(filter) {
    this.params.append('filter', filter);
    return this;
  }

  getUrlSearchParams() {
    return this.params;
  }
}
