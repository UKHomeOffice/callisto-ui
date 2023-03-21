import DatesMoved from '../message-item-types/DatesMoved';
import { messageKeys } from '../../../../utils/constants';
import { useTimecardContext } from '../../../../context/TimecardContext';

const components = {
  datesMoved: DatesMoved,
};

const MessageItem = () => {
  const { summaryMessages } = useTimecardContext();
  if (messageKeys.update in summaryMessages) {
    const template = summaryMessages[messageKeys.update].template;
    const variables = summaryMessages[messageKeys.update].variables;

    const Component = components[template];
    return <Component variables={variables} />;
  } else {
    return null;
  }
};

export default MessageItem;
