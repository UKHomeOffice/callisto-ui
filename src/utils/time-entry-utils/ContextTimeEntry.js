export class ContextTimeEntry {
  timeEntryId = '';
  startTime = '';
  finishTime = '';
  timePeriodTypeId = '';

  constructor(timeEntryId, startTime, finishTime, timePeriodTypeId) {
    this.timeEntryId = timeEntryId ? timeEntryId : '';
    this.startTime = startTime ? startTime : '';
    this.finishTime = finishTime ? finishTime : '';
    this.timePeriodTypeId = timePeriodTypeId ? timePeriodTypeId : '';
  }

  static createFrom(contextTimeEntry) {
    return new ContextTimeEntry(
      contextTimeEntry.timeEntryId,
      contextTimeEntry.startTime,
      contextTimeEntry.finishTime,
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

  setTimePeriodTypeId(timePeriodTypeId) {
    this.timePeriodTypeId = timePeriodTypeId;
    return this;
  }
}
