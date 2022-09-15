export class ContextTimeEntry {
  timeEntryId = '';
  timePeriodType = '';
  startTime = '';
  finishTime = '';
  timePeriodTypeId = '';

  constructor(
    timeEntryId,
    timePeriodType,
    startTime,
    finishTime,
    timePeriodTypeId
  ) {
    this.timeEntryId = timeEntryId ? timeEntryId : '';
    this.timePeriodType = timePeriodType ? timePeriodType : '';
    this.startTime = startTime ? startTime : '';
    this.finishTime = finishTime ? finishTime : '';
    this.timePeriodTypeId = timePeriodTypeId ? timePeriodTypeId : '';
  }

  static createFrom(contextTimeEntry) {
    return new ContextTimeEntry(
      contextTimeEntry.timeEntryId,
      contextTimeEntry.timePeriodType,
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

  setTimePeriodType(timePeriodType) {
    this.timePeriodType = timePeriodType;
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
