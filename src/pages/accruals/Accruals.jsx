import { useParams } from 'react-router-dom';
import { useApplicationContext } from '../../context/ApplicationContext';
import { formatDate } from '../../utils/time-entry-utils/timeEntryUtils';
import dayjs from 'dayjs';
import { UrlSearchParamBuilder } from '../../utils/api-utils/UrlSearchParamBuilder';
import { validateServiceErrors } from '../../utils/api-utils/ApiUtils';
import {
  buildAccrualsFilter,
  buildAgreementFilter,
  buildAgreementTargetFilter,
} from '../../utils/filters/accruals-filter/accrualsFilterBuilder';
import { useEffect, useState } from 'react';
import {
  getAccruals,
  getAgreements,
  getAgreementTargets,
} from '../../api/services/accrualsService';
import AnnualTargetHours from '../../components/annual-target-hours/accruals/AnnualTargetHours';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { accrualsTypeIds } from '../../utils/constants';
import NavigationLinks from '../../components/layout/navigation/NavigationLinks';

const Accruals = () => {
  const { t } = useTranslation('common');
  const { setServiceError } = useApplicationContext();
  const { date: accrualsDate } = useParams();
  const previousDay = formatDate(dayjs(accrualsDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(accrualsDate).add(1, 'day'));

  const [targetData, setTargetData] = useState(null);
  const [agreementStartDate, setAgreementStartDate] = useState(null);
  const [agreementEndDate, setAgreementEndDate] = useState(null);
  const [annualTargetHoursData, setAnnualTargetHoursData] = useState(null);

  let agreementId = '';

  useEffect(async () => {
    clearAccrualsData();
    if (isOutsideAgreementDates()) {
      await getAllData(accrualsDate, setServiceError);
    } else {
      await getAccrualsData(accrualsDate, setServiceError);
    }
  }, [accrualsDate]);

  const isOutsideAgreementDates = () => {
    return (
      agreementStartDate === null ||
      agreementEndDate === null ||
      accrualsDate < agreementStartDate ||
      accrualsDate > agreementEndDate
    );
  };

  const setAccrualsData = (fetchedAccruals) => {
    fetchedAccruals.forEach((accrual) => {
      if (accrual.accrualTypeId === accrualsTypeIds.annualTargetHours) {
        setAnnualTargetHoursData(accrual);
      }
    });
  };

  const clearAccrualsData = () => {
    setAnnualTargetHoursData(null);
  };

  const getAllData = async (accrualsDate, setServiceError) => {
    await getAgreementData(accrualsDate, setServiceError);
    if (agreementId) {
      await getAgreementTargetData(accrualsDate, setServiceError);
      await getAccrualsData(accrualsDate, setServiceError);
    }
  };

  const getAgreementData = async (date, setServiceError) => {
    const agreementParams = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .setFilter(buildAgreementFilter(date))
      .getUrlSearchParams();

    await validateServiceErrors(setServiceError, async () => {
      const agreementResponse = await getAgreements(agreementParams);

      if (
        agreementResponse.status == 200 &&
        agreementResponse.data.items?.length > 0
      ) {
        setAgreementStartDate(agreementResponse.data.items[0].startDate);
        setAgreementEndDate(agreementResponse.data.items[0].endDate);
        agreementId = agreementResponse.data.items[0].id;
      } else {
        setTargetData(null);
        setAgreementStartDate(null);
        setAgreementEndDate(null);
      }
    });
  };

  const getAgreementTargetData = async (date, setServiceError) => {
    const targetParams = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .setFilter(buildAgreementTargetFilter(agreementId))
      .getUrlSearchParams();

    await validateServiceErrors(setServiceError, async () => {
      const targetResponse = await getAgreementTargets(targetParams);

      if (
        targetResponse.status == 200 &&
        targetResponse.data.items?.length > 0
      ) {
        setTargetData(targetResponse.data.items[0]);
      } else {
        setTargetData(null);
      }
    });
  };

  const getAccrualsData = async (date, setServiceError) => {
    const accrualsParams = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .setFilter(buildAccrualsFilter(date))
      .getUrlSearchParams();

    await validateServiceErrors(setServiceError, async () => {
      const accrualsResponse = await getAccruals(accrualsParams);

      if (accrualsResponse.status == 200) {
        setAccrualsData(accrualsResponse.data.items);
      }
    });
  };

  return (
    <>
      <h1 id="accruals-balance-title" className="govuk-caption-m">
        {t('accruals.balance')}
      </h1>
      <h2 id="accruals-date" className="govuk-heading-m">
        {dayjs(accrualsDate).format(t('accruals.dateFormat'))}
      </h2>
      <NavigationLinks
        url={'accruals'}
        previousDay={previousDay}
        nextDay={nextDay}
      />
      <AnnualTargetHours
        targetData={targetData}
        accrualsData={annualTargetHoursData}
      />
    </>
  );
};

export default Accruals;
