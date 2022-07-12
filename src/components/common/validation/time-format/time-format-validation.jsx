const TimeFormatValidator = () => {
    const validateTime = (time) => {
        var timeRegEx = /^\d{2}:\d{2}/;
        var result = {"valid": true, "reason": []};
        // If the time isn't in the correct format don't even bother running the rest of the validation
        if (timeRegEx.test(time)){
            var hours = time.slice(0, 2);
            var minutes = time.slice(2);
            
            minutes = minutes.replace(":", "");
            
            if (hours>23 || hours<0){
                result.valid = false;
                result.reason.push("Incorrect value entered for hours");
            } 
            if (minutes>60 || minutes<0){
                result.valid = false;
                result.reason.push("Incorrect value entered for minutes");
            }
            return result;
        } else {
            result.valid = false;
            result.reason.push("Incorrect time format entered");
        }
        return result;
    }
}

export default TimeFormatValidator;