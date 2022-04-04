import PropTypes from 'prop-types';

const SummaryList = ({ rows }) => {
  return (
    <>
      <dl className="govuk-summary-list">
        {rows.map((row, index) => {
          return (
            <div className="govuk-summary-list__row" key={index}>
              <dt className="govuk-summary-list__key">{row.title}</dt>
              <dd className="govuk-summary-list__value">{row.value}</dd>
              {row.action && (
                <dd
                  className="govuk-summary-list__actions"
                  data-testid="summary-actions"
                >
                  <a className="govuk-link" href={row.link}>
                    {row.action}
                    <span className="govuk-visually-hidden">
                      {' '}
                      {row.title.toLowerCase()}
                    </span>
                  </a>
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </>
  );
};

SummaryList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      action: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};

export default SummaryList;
