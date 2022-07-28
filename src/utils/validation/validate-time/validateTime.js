export const validateTime = (time) => {
  var timeRegEx = /^\d{2}:\d{2}$/;
  // If the time isn't in the correct format don't even bother running the rest of the validation
  if (timeRegEx.test(time)) {
    var hours = time.slice(0, 2);
    var minutes = time.slice(2);
    minutes = minutes.replace(':', '');

    if (hours > 23 || hours < 0) {
      return false;
    }
    if (minutes > 59 || minutes < 0) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};
