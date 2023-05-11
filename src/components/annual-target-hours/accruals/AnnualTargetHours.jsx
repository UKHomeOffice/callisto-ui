import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const AnnualTargetHours = ({ targetData, accrualsData }) => {
  const { t } = useTranslation('common');
  const total = targetData?.targetTotal || 0;
  const worked = accrualsData?.cumulativeTotal || 0;
  const remaining = total - worked;
  const target = total - (accrualsData?.cumulativeTarget || 0);

  return (
    <div className="accruals-container">
      <form className="grey-border">
        <h1 className="govuk-heading-m newline">
          {t('annualTargetHours.titleRemaining', { count: remaining })}
        </h1>

        <table className="govuk-table">
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.total')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {total}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.worked')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {worked}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.remaining')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {remaining}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                {t('annualTargetHours.target')}
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {target}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AnnualTargetHours;

// AnnualTargetHours.propTypes = {
//   targetData: PropTypes.shape({
//     id: PropTypes.string,
//     tenantId: PropTypes.string,
//     agreementId: PropTypes.string,
//     accrualTypeId: PropTypes.string,
//     targetTotal: PropTypes.number,
//   }),
//   accrualsData: PropTypes.shape({
//     id: PropTypes.string,
//     tenantId: PropTypes.string,
//     personId: PropTypes.string,
//     agreementId: PropTypes.string,
//     accrualDate: PropTypes.string,
//     accrualTypeId: PropTypes.string,
//     cumulativeTotal: PropTypes.number,
//     cumulativeTarget: PropTypes.number,
//     contributions: PropTypes.shape({
//       timeEntries: PropTypes.object,
//       total: PropTypes.number,
//     }),
//   }),
// };
