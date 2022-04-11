import { initAll } from 'govuk-frontend';
import { useState, useEffect } from 'react';
import Notes from './Notes';

const NotesSummaryList = () => {
  const [addNote, setAddNote] = useState(false);

  const handleClick = () => {
    event.preventDefault();
    setAddNote(!addNote);
  };

  useEffect(() => {
    initAll();
  });

  return (
    <>
      <dl className="govuk-summary-list govuk-summary-list--no-border">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Notes</dt>
          {/* <dd className="govuk-summary-list__value"> */}

          {/* </dd> */}
          <dd className="govuk-summary-list__actions">
            <a className="govuk-link" href="/" onClick={handleClick}>
              Add<span className="govuk-visually-hidden"> notes</span>
            </a>
          </dd>
        </div>
        <div id="with-hint-hint" className="govuk-hint">
          Enter anything important that happened during the shift, including any
          unplanned absences. This will be added to the timecard timeline.
        </div>
      </dl>
      {addNote ? <Notes /> : null}
    </>
  );
};

NotesSummaryList.propTypes = {};

export default NotesSummaryList;
