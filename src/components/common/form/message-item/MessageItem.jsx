import DatesMoved from '../message-item-types/DatesMoved';
import { messageKeys } from '../../../../utils/constants';

const components = {
  datesMoved: DatesMoved,
};

const MessageItem = (message) => {
  if (messageKeys.update == message.key) {
    const template = message.template;
    const variables = message.variables;

    const Component = components[template];
    return <Component variables={variables} />;
  } else {
    return null;
  }
};

export default MessageItem;
