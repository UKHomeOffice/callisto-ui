import PropTypes from 'prop-types';

const AnnualTargetHours = ({ agreementTarget, accruals }) => {
  const total = agreementTarget.items[0].targetTotal;
  const worked = accruals.items[0].cumulativeTotal;
  const remaining = total - worked;
  const target = total - worked;

  return (
    <div className="accruals-container">
      <form className="grey-border">
        <h1 className="govuk-heading-m">Annual target hours</h1>
        <h1 className="govuk-heading-m">
          <span className="bold">{remaining}</span> remaining
        </h1>
        <table className="govuk-table">
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                Total
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {total}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                Worked
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {worked}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                Remaining
              </th>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {remaining}
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                Target
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
    meta: PropTypes.shape({
      next: PropTypes.any,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        tenantId: PropTypes.string,
        agreementId: PropTypes.string,
        accrualTypeId: PropTypes.string,
        targetTotal: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
  accruals: PropTypes.shape({
    meta: PropTypes.shape({
      next: PropTypes.any,
    }),
    items: PropTypes.arrayOf(
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
  }),
};
