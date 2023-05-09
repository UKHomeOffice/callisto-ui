/* eslint-disable prettier/prettier */
import { Link, useParams } from 'react-router-dom';
import { useApplicationContext } from '../../context/ApplicationContext';
import {
  formatDate,
} from '../../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { validateServiceErrors } from '../../utils/api-utils/ApiUtils';
import { buildAccrualsFilter, buildAgreementFilter, buildAgreementTargetFilter } from '../../utils/filters/accruals-filter/accrualsFilterBuilder';
import { useEffect, useState } from 'react';
import { getAccruals, getAgreements, getAgreementTargets } from '../../api/services/accrualsService';
import AnnualTargetHours from '../../components/annual-target-hours/accruals/AnnualTargetHours';

const Accruals = () => {
  const { setServiceError } = useApplicationContext();
  const { date: accrualsDate } = useParams();
  const previousDay = formatDate(dayjs(accrualsDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(accrualsDate).add(1, 'day'));

  const [agreementData, setAgreementData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [accrualsData, setAccrualsData] = useState([]);

  let agreementStartDate = null;
  let agreementEndDate = null;
  let agreementId = '';

  useEffect(async () => {
    if (agreementStartDate === null || agreementEndDate === null) {
      getAllData(accrualsDate, setServiceError);
    }
    else {
      setAccrualsData(getAccrualsData(
        accrualsDate,
        setServiceError
      ));
    }
  }, [accrualsDate]);

  const getAllData = async (
    accrualsDate,
    setServiceError
  ) => {
    await getAgreementData(accrualsDate, setServiceError);
    if(agreementId) {
      await getAgreementTargetData(accrualsDate, setServiceError);
      await getAccrualsData(
        accrualsDate,
        setServiceError
      );
    }
  };
  
  const getAgreementData = async (
    date,
    setServiceError
  ) => {
  const agreementParams = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilter(buildAgreementFilter(date))
    .getUrlSearchParams();
  
    await validateServiceErrors(setServiceError, async () => {
      const agreementResponse = await getAgreements(agreementParams);
  
      if (agreementResponse.status == 200 && agreementResponse.data.items?.length > 0) {
        console.log('Agreement data retrieved: ', agreementResponse.data.items);
        agreementStartDate = agreementResponse.data.items[0].startDate;
        agreementEndDate = agreementResponse.data.items[0].endDate;
        agreementId = agreementResponse.data.items[0].id;
        setAgreementData(agreementResponse.data.items);
      }
      else {
        setAgreementData([]);
      }
    });
  };
  
  const getAgreementTargetData = async (
    date,
    setServiceError
  ) => {
  const targetParams = new UrlSearchParamBuilder()
    .setTenantId('00000000-0000-0000-0000-000000000000')
    .setFilter(buildAgreementTargetFilter(agreementId))
    .getUrlSearchParams();
  
    await validateServiceErrors(setServiceError, async () => {
      const targetResponse = await getAgreementTargets(targetParams);
  
      if (targetResponse.status == 200 && targetResponse.data.items?.length > 0) {
        console.log('Agreement target data retrieved: ', targetResponse.data.items);
        setTargetData(targetResponse.data.items[0]);
      }
      else {
        setTargetData([]);
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
  
    await validateServiceErrors(setServiceError, async () => {
      const accrualsResponse = await getAccruals(accrualsParams);
  
      if (accrualsResponse.status == 200 && accrualsResponse.data.items?.length > 0) {
        console.log('Accruals data retrieved: ', accrualsResponse.data.items);
        setAccrualsData(accrualsResponse.data.items);
      }
      else {
        setAccrualsData([]);
      }
    });
  };
 
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
      {/* <AnnualTargetHours /> */}
    </>
  );
};

export default Accruals;
