import { PropTypes, Link } from 'prop-types';
import SingleDateMoved from '../message-item-types/SingleDateMoved';

const DateMoved = () => {
  return (
    <div>
      <Link
        onClick={() => {
          // clearSummary();
        }}
        className="govuk-link govuk-link--no-visited-state"
        to={`/timecard/2023-03-05`}
      >
        05 March
      </Link>
    </div>
  );
};

const components = {
  dateMoved: DateMoved,
  singleDateMoved: SingleDateMoved,
};

const MessageItem = (templateName) => {
  //const TagName = this.props.tag;
  // const TagName = components['SingleDateMoved'];
  // return <TagName />
  const Component = components['singleDateMoved'];
  return <Component />;
};

export default MessageItem;

MessageItem.propTypes = {
  templateName: PropTypes.string,
};

DateMoved.propTypes = {};
