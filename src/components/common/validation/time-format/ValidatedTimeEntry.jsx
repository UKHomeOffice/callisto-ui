import PropTypes from 'prop-types';
import { deepCloneJson } from '../../../../utils/common-utils/common-utils';
import { inputNames } from '../../../../utils/constants';
import { ContextTimeEntry } from '../../../../utils/time-entry-utils/ContextTimeEntry';
import { isFinishTimeOnNextDay } from '../../../../utils/time-entry-utils/timeEntryUtils';

const ValidatedTimeEntry = ({
  name,
  timeType,
  errors,
  defaultValue,
  register,
  updateFinishTimeText,
}) => {
  const errorMessage = `Enter a ${timeType} in the 24 hour clock format, for example, 08:00 or 0800`;

  return (
    <input
      id={name}
      name={name}
      className={`govuk-input ${
        Object.keys(errors).length !== 0 &&
        Object.values(errors).some(
          (error) =>
            error.inputName === 'shift-start-time' ||
            error.inputName === 'shift-end-time'
        )
          ? 'govuk-input--error'
          : ''
      } govuk-input--width-5`}
      defaultValue={defaultValue}
      data-testid={name}
      autoComplete="off"
      type="text"
      {...register(name, {
        onBlur: () => updateFinishTimeText(timeType),
      })}
    />
  );
};

export default ValidatedTimeEntry;

ValidatedTimeEntry.propTypes = {
  name: PropTypes.string.isRequired,
  timeType: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  register: PropTypes.any.isRequired,
  isRequired: PropTypes.bool,
  formState: PropTypes.any,
  getFormValues: PropTypes.func.isRequired,
  timeEntry: PropTypes.object.isRequired,
  timeEntriesIndex: PropTypes.number.isRequired,
  setFinishTimeText: PropTypes.func,
};
