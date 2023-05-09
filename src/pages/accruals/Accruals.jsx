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
import { useTranslation, Trans } from 'react-i18next';

const Accruals = () => {
  const { t } = useTranslation('common');
  const { setServiceError } = useApplicationContext();
  const { date: accrualsDate } = useParams();
  const previousDay = formatDate(dayjs(accrualsDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(accrualsDate).add(1, 'day'));

  const [agreementData, setAgreementData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [accrualsData, setAccrualsData] = useState([]);
  const [agreementStartDate, setAgreementStartDate] = useState(null);
  const [agreementEndDate, setAgreementEndDate] = useState(null);
  
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
        setAgreementStartDate(agreementResponse.data.items[0].startDate);
        setAgreementEndDate(agreementResponse.data.items[0].endDate);
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
      <h1 className="govuk-caption-m">{t('accruals.balance')}</h1>
      <h2 className="govuk-heading-m">
      {dayjs(accrualsDate).format(t('accruals.dateFormat'))}
      </h2>
      <div className="govuk-button-group button-group-row">
        <Link
          onClick={() => {}}
          className="govuk-link govuk-link--no-visited-state"
          to={`/accruals/${previousDay}`}
        >
          {t('accruals.previousDay')}
        </Link>
        <Link
          onClick={() => {}}
          className="govuk-link govuk-link--no-visited-state"
          to={`/accruals/${nextDay}`}
        >
          {t('accruals.nextDay')}
        </Link>
      </div>
      <AnnualTargetHours agreementTarget={targetData} accruals={accrualsData} />
    </>
  );
};

export default Accruals;
