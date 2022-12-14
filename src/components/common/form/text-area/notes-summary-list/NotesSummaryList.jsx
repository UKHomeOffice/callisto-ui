import { initAll } from 'govuk-frontend';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notes from '../notes/Notes';

const NotesSummaryList = () => {
  const [addNote, setAddNote] = useState(false);

  const handleClick = () => {
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
          <dd className="govuk-summary-list__actions">
            <Link className="govuk-link" to="/" onClick={handleClick}>
              Add<span className="govuk-visually-hidden"> notes</span>
            </Link>
          </dd>
        </div>
        <div id="with-hint-hint" className="govuk-hint">
          Enter anything important that happened during the shift, including any
          unplanned absences. This will be added to the timecard timeline.
        </div>
      </dl>
      {addNote ? <Notes maxLength={250} /> : null}
    </>
  );
};

export default NotesSummaryList;
