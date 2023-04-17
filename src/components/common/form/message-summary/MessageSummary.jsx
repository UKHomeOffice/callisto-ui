import PropTypes from 'prop-types';
import MessageItem from '../message-item/MessageItem';

const MessageSummary = ({ keys }) => {
  return (
    <div
      className="govuk-notification-banner mobile-banner"
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id="govuk-notification-banner-title"
        >
          Hours changed
        </h2>
      </div>
      <div className="govuk-notification-banner__content">
        <ul className="govuk-list govuk-message-summary__list">
          {keys.map((key) => (
            <li
              key={key}
              id={`summary-message-${key}`}
              data-testid="message-body"
            >
              <MessageItem />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageSummary;

MessageSummary.propTypes = {
  keys: PropTypes.array,
};
