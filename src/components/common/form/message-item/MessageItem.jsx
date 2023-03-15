import PropTypes from 'prop-types';
import DatesMoved from '../message-item-types/DatesMoved';

const components = {
  datesMoved: DatesMoved,
};

const MessageItem = ({
  messageSummary,
  setSummaryMessages,
  setIsAlertVisible,
}) => {
  if ('update' in messageSummary) {
    const template = messageSummary['update'].template;
    const variables = messageSummary['update'].variables;

    const Component = components[template];
    return (
      <Component
        variables={variables}
        setSummaryMessages={setSummaryMessages}
        setIsAlertVisible={setIsAlertVisible}
      />
    );
  } else {
    return null;
  }
};

export default MessageItem;

MessageItem.propTypes = {
  messageSummary: PropTypes.object,
  setSummaryMessages: PropTypes.func,
  setIsAlertVisible: PropTypes.func,
};
