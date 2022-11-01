export class ContextTimeEntry {
  timeEntryId = '';
  startTime = '';
  finishTime = '';
  finishDate = '';
  timePeriodTypeId = '';

  constructor(
    timeEntryId,
    startTime,
    finishTime,
    finishDate,
    timePeriodTypeId
  ) {
    this.timeEntryId = timeEntryId ? timeEntryId : '';
    this.startTime = startTime ? startTime : '';
    this.finishTime = finishTime ? finishTime : '';
    this.finishDate = finishDate ? finishDate : '';
    this.timePeriodTypeId = timePeriodTypeId ? timePeriodTypeId : '';
  }

  static createFrom(contextTimeEntry) {
    return new ContextTimeEntry(
      contextTimeEntry.timeEntryId,
      contextTimeEntry.startTime,
      contextTimeEntry.finishTime,
      contextTimeEntry.finishDate,
      contextTimeEntry.timePeriodTypeId
    );
  }

  static create() {
    return new ContextTimeEntry();
  }

  setTimeEntryId(timeEntryId) {
    this.timeEntryId = timeEntryId;
    return this;
  }

  setStartTime(startTime) {
    this.startTime = startTime;
    return this;
  }

  setFinishTime(finishTime) {
    this.finishTime = finishTime;
    return this;
  }

  setFinishDate(finishDate) {
    this.finishDate = finishDate;
    return this;
  }

  setTimePeriodTypeId(timePeriodTypeId) {
    this.timePeriodTypeId = timePeriodTypeId;
    return this;
  }
}
