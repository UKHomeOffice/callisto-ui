/* eslint-disable prettier/prettier */
import { Link, useParams } from 'react-router-dom';
import { useApplicationContext } from '../../context/ApplicationContext';
import {
  formatDate,
} from '../../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { validateServiceErrors } from '../../utils/api-utils/ApiUtils';
import { buildAccrualsFilter, buildAgreementFilter } from '../../utils/filters/accruals-filter/accrualsFilterBuilder';
import { useEffect } from 'react';
import { getAccruals, getAgreements } from '../../api/services/accrualsService';

const Accruals = () => {
  const { setServiceError } = useApplicationContext();
  const { date: accrualsDate } = useParams();
  const previousDay = formatDate(dayjs(accrualsDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(accrualsDate).add(1, 'day'));

  useEffect(() => {
    getAgreementData(accrualsDate, setServiceError);
    // getAccrualsData(
    //   accrualsDate,
    //   setServiceError
    // );
  }, [accrualsDate]);
 
  return (
    <>
      <h1 className="govuk-caption-m">My accruals balance as of</h1>
      <h2 className="govuk-heading-m">
        {dayjs(accrualsDate).format('D MMMM YYYY')}
      </h2>
      <div className="govuk-button-group button-group-row">
        <Link
          onClick={() => {}}
          className="govuk-link govuk-link--no-visited-state"
          to={`/accruals/${previousDay}`}
        >
          Previous day
        </Link>
        <Link
          onClick={() => {}}
          className="govuk-link govuk-link--no-visited-state"
          to={`/accruals/${nextDay}`}
        >
          Next day
        </Link>
      </div>
    </>
  );
};

const getAgreementData = async (
  date,
  setServiceError
) => {
const accrualsParams = new UrlSearchParamBuilder()
  .setTenantId('00000000-0000-0000-0000-000000000000')
  .setFilter(buildAgreementFilter(date))
  .getUrlSearchParams();

  validateServiceErrors(setServiceError, async () => {
    const accrualsResponse = await getAgreements(accrualsParams);

    if (accrualsResponse.status == 200) {
      console.log('Data retrieved: ', accrualsResponse.data.items);
    }
  });
};

const getAccrualsData = async (
  date,
  setServiceError
) => {
const accrualsParams = new UrlSearchParamBuilder()
  .setTenantId('00000000-0000-0000-0000-000000000000')
  .setFilter(buildAccrualsFilter(date))
  .getUrlSearchParams();

  validateServiceErrors(setServiceError, async () => {
    const accrualsResponse = await getAccruals(accrualsParams);

    if (accrualsResponse.status == 200) {
      console.log('Data retrieved: ', accrualsResponse.data.items);
    }
  });
};

export default Accruals;
