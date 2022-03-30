import ButtonGroup from '../navigation/buttonGroup';

const Notes = () => {
  return (
    <>
      <div
        className="govuk-character-count"
        data-module="govuk-character-count"
        data-maxlength="200"
      >
        {/* add --error to class when javascript is working */}
        <div className="govuk-form-group">
          {/* <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="with-hint">
                Notes
              </label>
            </h1> */}

          {/* <p id="exceeding-characters-error" className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> Notes must be
              200 characters or fewer
            </p> */}
          <textarea
            className="govuk-textarea govuk-!-width-two-thirds govuk-js-character-count"
            id="with-hint"
            name="with-hint"
            rows="5"
            aria-describedby="with-hint-info with-hint-hint"
          ></textarea>
        </div>

        <div
          id="with-hint-info"
          className="govuk-hint govuk-character-count__message govuk-!-padding-bottom-4"
          aria-live="polite"
        >
          You can enter up to 200 characters
        </div>
        <ButtonGroup buttonText1="Save" buttonText2="Cancel" />
      </div>
    </>
  );
};

Notes.propTypes = {};

export default Notes;
