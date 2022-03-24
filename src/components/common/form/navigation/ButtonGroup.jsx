import PropTypes from 'prop-types'

const ButtonGroup = ({ buttonText1, buttonText2 }) => {
  return (
    <div data-testid="buttonGroup" className="govuk-button-group">
  <button 
  className="govuk-button"
   data-module="govuk-button"
   role="button"
   >
    {buttonText1}
  </button>

  <button className="govuk-button govuk-button--secondary"
   data-module="govuk-button"
   role="button"

   >
    {buttonText2}
  </button>
</div>
  )
}

ButtonGroup.propTypes = {
    buttonText1: PropTypes.string.isRequired,
    buttonText2: PropTypes.string.isRequired
}

export default ButtonGroup
