# Timecard


The timecard page enables the user to record their work times via a sequence of screens. Currently the only developed timecardPeriodType is Shift. After choosing this radio button option, the user is taken to the TimecardEntriesList component where they can input the times and dates worked:

![Timecard Entries List](images/Screenshot%202023-06-22%20at%2008.15.32.png)


After clicking save, the screen displays the recorded shift with the option to remove or edit it: 

![Timecard Shift Times](images/Screenshot%202023-06-22%20at%2008.46.42.png)

The user is notified if the finish time is on the next day using dynamic next:

![Finish Next Day Text](images/Screenshot%202023-06-22%20at%2009.26.14.png)

The date input is conditionally rendered by clicking the checkbox. The dates are automatically inserted. If 'isFinishTimeOnNextDay' is true, the finish date is set to the next day. These can be manually changed: 

![Timecard Dates](images/Screenshot%202023-06-22%20at%2010.14.50.png)

The user remains on the start date of the Timecard:

![Shift Over One Day](images/Screenshot%202023-06-22%20at%2010.20.38.png)

If the user navigates to the Next day, we remain on this shift so 'Shift (continued)' is displayed: 

![Shift Continued](images/Screenshot%202023-06-22%20at%2010.56.08.png)

## To be noted:

Validation is in place to prevent invalid time iputs: 

![Error Banner](images/Screenshot%202023-06-22%20at%2011.19.05.png)


A banner notifying the user that their hours have been changed is displayed only if the day is edited to move from the current timecard date:

![Hours Changed Banner](images/Screenshot%202023-06-22%20at%2011.51.30.png)

Finish time can be left blank without error, the date field pre-populates to finish on the same day but will not actually be set without a time:

![No Finish Time](images/Screenshot%202023-06-22%20at%2011.20.58.png)



## Outstanding tasks which impact Timecard:

The dynamic text 'Finishes next day' would be changed to display the shift length as the user types - [EAHW-2605](https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2605)

The user would be able to cancel a shift creation - [eahw-2132](https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2132)

Remove react hook forms from the ui for better data control and simplicity - [EAHW-2748](https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2748)

Date/Time field validation to be moved from Shift component to lowest level of date/time component - [EAHW-2750](https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2750)




