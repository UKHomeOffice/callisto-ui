import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';

const MessageSummary = ({ messages, keys }) => {
  return (
    <div
      className="govuk-notification-banner"
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id="govuk-notification-banner-title"
        >
          Update Successful
        </h2>
      </div>
      <div className="govuk-notification-banner__content">
        <ul className="govuk-list govuk-message-summary__list">
          {keys.map((key, i) => (
            <li key={i} id={`summary-message-${i}`} data-testid="message-body">
              <HashLink id={`summary-message-${i}-message`} to={`#${key}`}>
                {messages[key].message}
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageSummary;

MessageSummary.propTypes = {
  messages: PropTypes.any,
  keys: PropTypes.array,
};
