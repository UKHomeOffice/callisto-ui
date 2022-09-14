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
    this.timeEntryId = timeEntryId;
    this.timePeriodType = timePeriodType;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.timePeriodTypeId = timePeriodTypeId;
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
