import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { formatToHoursAndMinutes } from '../../../utils/time-entry-utils/timeEntryUtils';

const AnnualTargetHours = ({ targetData, accrualsData }) => {
  const { t } = useTranslation('common');
  const total = targetData?.targetTotal || 0;
  const worked = accrualsData?.cumulativeTotal || 0;
  const remainingMins = Math.floor(total - worked);
  const remainingHours = Math.floor(remainingMins / 60);
  const target = total - (accrualsData?.cumulativeTarget || 0);

  return (
    <div className="accruals-container">
      <form className="grey-border">
        <h1 className="govuk-heading-m newline">
          {targetData ? (
            <span
              dangerouslySetInnerHTML={{
                __html: t('annualTargetHours.remainingHoursTitle', {
                  count: remainingHours,
                }),
              }}
            />
          ) : (
            t('annualTargetHours.noAgreement')
          )}
        </h1>
        <table className="govuk-table">
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.total')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {targetData ? formatToHoursAndMinutes(total) : '-'}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.worked')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {targetData ? formatToHoursAndMinutes(worked) : '-'}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.remaining')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {targetData ? formatToHoursAndMinutes(remainingMins) : '-'}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.target')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {targetData ? formatToHoursAndMinutes(target) : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AnnualTargetHours;

AnnualTargetHours.propTypes = {
  targetData: PropTypes.shape({
    id: PropTypes.string,
    tenantId: PropTypes.string,
    agreementId: PropTypes.string,
    accrualTypeId: PropTypes.string,
    targetTotal: PropTypes.number,
  }),
  accrualsData: PropTypes.shape({
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
  }),
};
