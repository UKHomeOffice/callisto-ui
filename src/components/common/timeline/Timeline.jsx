import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const Timeline = ({ items }) => {
  return (
    <div className="hods-timeline">
      {items.map((item, index) => {
        return (
          <div className="hods-timeline__item" key={index}>
            <h2 className="hods-timeline__title">{item.title}</h2>
            <p className="hods-timeline__by">by {item.updatedBy}</p>
            <p className="hods-timeline__date">
              <time dateTime={item.dateTime}>
                {dayjs(item.dateTime).format('DD/MM/YYYY, HH:mm:ss A')}
              </time>
            </p>
            {item.description && (
              <p className="hods-timeline__description">{item.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      updatedBy: PropTypes.string.isRequired,
      dateTime: PropTypes.instanceOf(Date).isRequired,
      description: PropTypes.string,
    })
  ),
};
