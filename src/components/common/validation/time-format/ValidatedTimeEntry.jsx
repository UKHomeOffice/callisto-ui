import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../form/input/Input';
import { useState, useEffect } from 'react';

const ValidatedTimeEntry = ({timeType}) => {

    const {
        register,
        formState,
        formState: { errors },
        errorMessages
    } = useForm({
        reValidateMode: 'onBlur',
    });

    const [setErrorMessages] = useState([]);

    useEffect(() => {
        updateErrorMessages();
    }, [formState]);

    const updateErrorMessages = () => {
        const findErrors =
          errors &&
          Object.keys(errors).filter((inputName) => inputName.includes(name));
        let relevantErrorMessages = [];
        if (findErrors) {
          relevantErrorMessages = findErrors.map((inputName) => {
            return errors[inputName].message;
          });
        }
        setErrorMessages(relevantErrorMessages);
      };

    const validateTime = (time) => {
        console.log("validating");
        var timeRegEx = /^\d{2}:\d{2}/;
        // If the time isn't in the correct format don't even bother running the rest of the validation
        if (timeRegEx.test(time)){
            var hours = time.slice(0, 2);
            var minutes = time.slice(2);
            
            minutes = minutes.replace(":", "");
            
            if (hours>23 || hours<0){
                return false;
            } 
            if (minutes>59 || minutes<0){
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    const triggerValidation = (e) =>{
        validateTime(e.target.value);
    }

    return <input 
                id='time-entry'
                name='time-entry' 
                className='govuk-input'
                onBlur={triggerValidation}
                {...register('time-entry', {
                    required: {
                        value: true,
                        message: 'You must enter a ' + timeType + ' in the HH:MM 24 hour clock format',
                    },
                    validate: {
                        validateTimeEntry: v => validateTime(v) || "You must enter a " + timeType +" in the HH:MM 24 hour clock format" 
                    }
                })} 
            />;
}

export default ValidatedTimeEntry;