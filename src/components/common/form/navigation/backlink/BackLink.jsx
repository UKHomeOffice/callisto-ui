import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BackLink = ({ text, link }) => {
  return (
    <Link to={link} className="govuk-back-link">
      {text ? text : 'Back'}
    </Link>
  );
};

BackLink.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default BackLink;
