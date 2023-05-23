import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { formatToHoursAndMinutes } from '../../../utils/time-entry-utils/timeEntryUtils';

const AccrualData = ({ targetData, accrualsData, titleTranslationKey }) => {
  const { t } = useTranslation('common');
  const total = targetData?.targetTotal || 0;
  const worked = accrualsData?.cumulativeTotal || 0;
  const remainingMins = Math.floor(total - worked);
  const remainingHours = Math.floor(remainingMins / 60);
  const target = total - (accrualsData?.cumulativeTarget || 0);
  const idSubstr = titleTranslationKey?.split('.')[0];
  let title;

  if (!targetData) {
    title = t('accrualsData.noAgreement');
  } else {
    title = t(titleTranslationKey, {
      count: remainingHours,
    });
  }

  return (
    <div className="accruals-container">
      <form className="grey-border">
        <h1 className="govuk-heading-m newline">
          <span
            id={`${idSubstr}-title-span`}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </h1>
        <table className="govuk-table">
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th
                id={`${idSubstr}-total-lbl`}
                scope="row"
                className="govuk-table__header"
              >
                {t('accrualsData.total')}
              </th>
              <td
                id={`${idSubstr}-total-value`}
                className="govuk-table__cell govuk-table__cell--numeric"
              >
                {targetData ? formatToHoursAndMinutes(total) : '-'}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th
                id={`${idSubstr}-worked-lbl`}
                scope="row"
                className="govuk-table__header"
              >
                {t('accrualsData.worked')}
              </th>
              <td
                id={`${idSubstr}-worked-value`}
                className="govuk-table__cell govuk-table__cell--numeric"
              >
                {targetData ? formatToHoursAndMinutes(worked) : '-'}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th
                id={`${idSubstr}-remaining-lbl`}
                scope="row"
                className="govuk-table__header"
              >
                {t('accrualsData.remaining')}
              </th>
              <td
                id={`${idSubstr}-remaining-value`}
                className="govuk-table__cell govuk-table__cell--numeric"
              >
                {targetData ? formatToHoursAndMinutes(remainingMins) : '-'}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th
                id={`${idSubstr}-target-lbl`}
                scope="row"
                className="govuk-table__header"
              >
                {t('accrualsData.target')}
              </th>
              <td
                id={`${idSubstr}-target-value`}
                className="govuk-table__cell govuk-table__cell--numeric"
              >
                {targetData ? formatToHoursAndMinutes(target) : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AccrualData;

AccrualData.propTypes = {
  targetData: PropTypes.shape({
    id: PropTypes.string,
    tenantId: PropTypes.string,
    agreementId: PropTypes.string,
    accrualTypeId: PropTypes.string,
    targetTotal: PropTypes.number,
  }),
  accrualsData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        tenantId: PropTypes.string,
        personId: PropTypes.string,
        agreementId: PropTypes.string,
        accrualDate: PropTypes.string,
        accrualTypeId: PropTypes.string,
        cumulativeTotal: PropTypes.number,
        cumulativeTarget: PropTypes.number,
        contributions: PropTypes.shape({
          timeEntries: PropTypes.object,
          total: PropTypes.number,
        }),
      })
    ),
  ]),
  titleTranslationKey: PropTypes.string,
};
