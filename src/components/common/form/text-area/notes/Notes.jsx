import ButtonGroup from '../../navigation/ButtonGroup';
import { useEffect, useState } from 'react';

const Notes = () => {
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState('');
  const maxLength = 250;

  useEffect(() => {
    if (characters.length > maxLength) {
      setError(true);
    } else {
      setError(false);
    }
  }, [characters]);

  const handleChange = (e) => {
    setCharacters(e.target.value);
  };

  return (
    <>
      <div
        className="govuk-character-count"
        data-module="govuk-character-count"
        data-maxlength="250"
        id="text-area"
      >
        <div
          className={`govuk-form-group ${error && 'govuk-form-group--error'}`}
          data-testid="text-area"
        >
          {error && (
            <p
              id="exceeding-characters-error"
              data-testid="exceeding-characters-error"
              className="govuk-error-message"
            >
              <span className="govuk-visually-hidden">Error:</span> Notes must
              be 250 characters or fewer
            </p>
          )}

          <textarea
            className={`govuk-textarea ${
              error && 'govuk-textarea--error'
            } govuk-!-width-two-thirds govuk-js-character-count ${
              error && 'govuk-textarea--error'
            }`}
            id="exceeding-characters"
            data-testid="exceeding-characters"
            name="exceeding"
            rows="5"
            aria-describedby={`exceeding-characters-info ${'exceeding-characters-error'}`}
            onChange={handleChange}
            value={characters}
          ></textarea>
        </div>

        <div
          id="exceeding-characters-info"
          className="govuk-hint govuk-character-count__message govuk-!-padding-bottom-4"
          aria-live="polite"
        >
          You can enter up to 250 characters
        </div>
        <ButtonGroup buttonText1="Save" buttonText2="Cancel" />
      </div>
    </>
  );
};

Notes.propTypes = {};

export default Notes;
