import PropTypes from 'prop-types';
import MessageItem from '../message-item/MessageItem';

const MessageSummary = ({ summaryMessages, setSummaryMessages }) => {
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
          Hours changed
        </h2>
      </div>
      <div className="govuk-notification-banner__content">
        <ul className="govuk-list govuk-message-summary__list">
          {summaryMessages.map((message) => (
            <li
              key={message.key}
              id={`summary-message-${message.key}`}
              data-testid={`message-body-${message.key}`}
            >
              <MessageItem
                message={message}
                setSummaryMessages={setSummaryMessages}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageSummary;

MessageSummary.propTypes = {
  summaryMessages: PropTypes.array,
  setSummaryMessages: PropTypes.func,
};
