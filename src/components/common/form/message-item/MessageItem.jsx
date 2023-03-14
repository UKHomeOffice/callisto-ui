import PropTypes from 'prop-types';
import SingleDateMoved from '../message-item-types/SingleDateMoved';
import DoubleDateMoved from '../message-item-types/DoubleDateMoved';

const components = {
  singleDateMoved: SingleDateMoved,
  doubleDateMoved: DoubleDateMoved,
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
