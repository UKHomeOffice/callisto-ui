import PropTypes from 'prop-types'

const Notes = () => {
  return (
<div className="govuk-character-count" data-module="govuk-character-count" data-maxlength="200">
  <div className="govuk-form-group">
    <h1 className="govuk-label-wrapper"><label className="govuk-label govuk-label--l" htmlFor="with-hint">
        Notes
      </label>
    </h1>
    <div id="with-hint-hint" className="govuk-hint">
    Enter anything important that happened during the shift, including any unplanned absences. This will be added to the timecard timeline. 
    </div>
    <p id="exceeding-characters-error" className="govuk-error-message">
      <span className="govuk-visually-hidden">Error:</span> Notes must be 200 characters or fewer
    </p>
    <textarea className="govuk-textarea govuk-js-character-count" id="with-hint" name="with-hint" rows="5" aria-describedby="with-hint-info with-hint-hint"></textarea>
  </div>

  <div id="with-hint-info" className="govuk-hint govuk-character-count__message" aria-live="polite">
    You can enter up to 200 characters
  </div>

</div>
  )
}

Notes.propTypes = {}

export default Notes