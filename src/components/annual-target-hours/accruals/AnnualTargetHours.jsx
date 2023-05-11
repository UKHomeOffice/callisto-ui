import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const AnnualTargetHours = ({ agreementTarget, accruals }) => {
  const { t } = useTranslation('common');
  let total = agreementTarget?.targetTotal || 0;
  let worked = accruals?.cumulativeTotal || 0;
  let remaining = Math.floor(total - worked);
  let target = total - (accruals?.cumulativeTarget || 0);

  if (!agreementTarget) {
    total = '-';
    worked = '-';
    remaining = '-';
    target = '-';
  }

  return (
    <div className="accruals-container">
      <form className="grey-border">
        <h1 className="govuk-heading-m newline">
          {agreementTarget ? t('annualTargetHours.titleRemaining', { count: remaining }) : 'No agreement has been found'}
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

AnnualTargetHours.propTypes = {
  agreementTarget: PropTypes.shape({
    id: PropTypes.string,
    tenantId: PropTypes.string,
    agreementId: PropTypes.string,
    accrualTypeId: PropTypes.string,
    targetTotal: PropTypes.number,
  }),
  accruals: PropTypes.shape({
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
