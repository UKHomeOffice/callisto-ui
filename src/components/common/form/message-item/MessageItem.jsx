import PropTypes from 'prop-types';
import SingleDateMoved from '../message-item-types/SingleDateMoved';

const components = {
  singleDateMoved: SingleDateMoved,
};

const MessageItem = (messageSummary) => {
  if (messageSummary.hasOwnProperty['update']) {
    console.log('template: ', messageSummary['update']);
    const template = messageSummary['update'].template;
    const variables = messageSummary['update'].variables;
    const Component = components[template];
    return <Component variables={variables} />;
  }

  return;
};

export default MessageItem;

MessageItem.propTypes = {
  messageSummary: PropTypes.object,
};
