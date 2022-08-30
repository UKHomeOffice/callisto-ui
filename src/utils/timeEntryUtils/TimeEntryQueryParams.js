export class TimeEntryQueryParams {

    params = null;

    constructor () {
        this.params = new URLSearchParams();
    }

    setTenantId(tenantId) {
        this.params.append('tenantId', tenantId);
        return this;
    }
    
    setFilter(filter) {
        this.params.append('filter', filter);
        return this;
    }

    getUrlSearchParams() {
        return this.params;
    }

}
