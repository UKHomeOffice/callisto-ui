import PropTypes from 'prop-types';

const BackLink = ({ text }) => {
  return (
    <a href="/" className="govuk-link--no-visited-state">
      {text}
    </a>
  );
};

BackLink.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BackLink;
