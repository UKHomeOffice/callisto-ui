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
import AccrualData from '../../components/annual-target-hours/accruals/AccrualData';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { accrualsTypes } from '../../utils/constants';
import NavigationLinks from '../../components/layout/navigation/NavigationLinks';

const Accruals = () => {
  const { t } = useTranslation('common');
  const { setServiceError, userId } = useApplicationContext();
  const { date: accrualsDate } = useParams();
  const previousDay = formatDate(dayjs(accrualsDate).subtract(1, 'day'));
  const nextDay = formatDate(dayjs(accrualsDate).add(1, 'day'));

  const [agreementStartDate, setAgreementStartDate] = useState(null);
  const [agreementEndDate, setAgreementEndDate] = useState(null);
  const [accrualsDataList, setAccrualsDataList] = useState([]);
  const [targetData, setTargetData] = useState([]);

  let agreementId = '';
  let localTargetData = [];

  useEffect(async () => {
    setAccrualsDataList([]);
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
    let accrualsList = [];
    fetchedAccruals.forEach((accrual) => {
      let accrualTitle = '';
      let accrualOrder = 0;

      switch (accrual.accrualTypeId) {
        case accrualsTypes.annualTargetHours.id:
          accrualTitle = 'annualTargetHours.remainingHoursTitle';
          accrualOrder = accrualsTypes.annualTargetHours.displayOrder;
          break;
        case accrualsTypes.nightHours.id:
          accrualTitle = 'nightHours.remainingHoursTitle';
          accrualOrder = accrualsTypes.nightHours.displayOrder;
          break;
        case accrualsTypes.weekendHours.id:
          accrualTitle = 'weekendHours.remainingHoursTitle';
          accrualOrder = accrualsTypes.weekendHours.displayOrder;
          break;
        default:
          accrualTitle = 'accrualsData.unknownAccrual';
          accrualOrder = 11;
          break;
      }
      const targetHours = createAccrualObject(
        accrual,
        accrualTitle,
        accrualOrder
      );
      accrualsList.push(targetHours);
    });
    accrualsList.sort((a, b) => (a.displayOrder > b.displayOrder ? 1 : -1));
    setAccrualsDataList(accrualsList);
  };

  const createAccrualObject = (accrual, accrualType, displayOrder) => {
    const targetList = targetData.length > 0 ? targetData : localTargetData;
    const target = targetList.filter((agreementTarget) => {
      return agreementTarget.accrualTypeId === accrual.accrualTypeId;
    });
    return {
      title: accrualType,
      data: accrual,
      targetTotal: target[0]?.targetTotal,
      displayOrder: displayOrder,
    };
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
      .setFilter(buildAgreementFilter(date, userId))
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
        setTargetData([]);
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
        let targetList = [];
        targetResponse.data.items.forEach((target) => {
          targetList.push({
            accrualTypeId: target.accrualTypeId,
            targetTotal: target.targetTotal,
          });
        });
        setTargetData(targetList);
        localTargetData = targetList;
      } else {
        setTargetData([]);
      }
    });
  };

  const getAccrualsData = async (date, setServiceError) => {
    const accrualsParams = new UrlSearchParamBuilder()
      .setTenantId('00000000-0000-0000-0000-000000000000')
      .setFilter(buildAccrualsFilter(date, userId))
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
      <div className="accruals-data accruals-grid">
        {accrualsDataList && accrualsDataList.length > 0 ? (
          accrualsDataList.map((accrualData) => (
            <AccrualData
              key={accrualData.data.id}
              targetTotal={accrualData.targetTotal}
              accrualsData={accrualData.data}
              titleTranslationKey={accrualData.title}
            />
          ))
        ) : (
          <AccrualData
            targetTotal={null}
            accrualsData={null}
            titleTranslationKey={
              targetData.length > 0
                ? 'accrualsData.noAccruals'
                : 'accrualsData.noAgreement'
            }
          />
        )}
      </div>
    </>
  );
};

export default Accruals;
