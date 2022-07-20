import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const TimeFormatValidator = () => {
    const validateTime = (time, timeType) => {
        var timeRegEx = /^\d{2}:\d{2}/;
        var result = {"valid": true, "response": []};
        // If the time isn't in the correct format don't even bother running the rest of the validation
        if (timeRegEx.test(time)){
            var hours = time.slice(0, 2);
            var minutes = time.slice(2);
            
            minutes = minutes.replace(":", "");
            
            if (hours>23 || hours<0){
                result.valid = false;
            } 
            if (minutes>59 || minutes<0){
                result.valid = false;
            }
        } else {
            result.valid = false;
        }
        if (result.valid === false){
            result.response.push("You must enter a " + timeType +" in the HH:MM 24 hour clock format");
        }
        return result;
    }
}

const ValidatedTimeEntry = ({timeType}) => {

    const {
        register,
        handleSubmit,
        formState,
        formState: { errors },
      } = useForm({
        reValidateMode: 'onBlur',
      });

    const validateTime = (time) => {
        var timeRegEx = /^\d{2}:\d{2}/;
        var result = {"valid": true, "response": ""};
        // If the time isn't in the correct format don't even bother running the rest of the validation
        if (timeRegEx.test(time)){
            var hours = time.slice(0, 2);
            var minutes = time.slice(2);
            
            minutes = minutes.replace(":", "");
            
            if (hours>23 || hours<0){
                result.valid = false;
            } 
            if (minutes>59 || minutes<0){
                result.valid = false;
            }
        } else {
            result.valid = false;
        }
        console.log(result);
        if (result.valid === false){
            result.response = "You must enter a " + timeType +" in the HH:MM 24 hour clock format";
        }
        return result;
    }

    const triggerValidation = (e) =>{
        validateTime(e.target.value);
    }

    return <Input name='time-entry' 
                className='govuk-input' 
                onChange={handleChange} 
                onBlur={triggerValidation} 
                {...register('time-entry', {
                    required: {
                        value: true,
                        message: 'You must enter a ' + timeType + ' in the HH:MM 24 hour clock format',
                    },
                })} />;
}

export default ValidatedTimeEntry;