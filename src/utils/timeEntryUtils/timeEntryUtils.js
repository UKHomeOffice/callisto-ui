
import dayjs from 'dayjs';

export const getSingleTimeEntryResponseItem = (timeEntryResponseData) => {
    if (timeEntryResponseData.items && timeEntryResponseData.items.length > 0)
        return timeEntryResponseData.items[0];
    else return null;
}

export const formatTime = (time) => {
    return dayjs(time).format('HH:mm');
}

export const formatDate = (dateTime) => {
    return dayjs(dateTime).format('YYYY-MM-DD');
}