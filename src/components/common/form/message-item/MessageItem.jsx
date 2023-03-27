import DatesMoved from '../message-item-types/DatesMoved';
import { messageKeys } from '../../../../utils/constants';
import PropTypes from 'prop-types';

const MessageItem = ({ message }) => {
  if (messageKeys.datesMoved === message.template) {
    const variables = message.variables;

    return <DatesMoved variables={variables} />;
  } else {
    return null;
  }
};

export default MessageItem;
MessageItem.propTypes = {
  message: PropTypes.object,
};
