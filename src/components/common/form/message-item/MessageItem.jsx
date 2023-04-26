import DatesMoved from '../message-item-types/DatesMoved';
import { messageKeys } from '../../../../utils/constants';
import PropTypes from 'prop-types';

const MessageItem = ({ message, setSummaryMessages }) => {
  if (messageKeys.datesMoved === message.template) {
    const variables = message.variables;

    return (
      <DatesMoved
        variables={variables}
        setSummaryMessages={setSummaryMessages}
      />
    );
  } else {
    return null;
  }
};

export default MessageItem;
MessageItem.propTypes = {
  message: PropTypes.shape({
    variables: PropTypes.object,
    template: PropTypes.string,
    key: PropTypes.string,
  }),
  setSummaryMessages: PropTypes.func,
};
