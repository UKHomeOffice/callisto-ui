# Timecard


The timecard page enables the user to record their work times via a sequence of screens. Currently the only developed timecardPeriodType is Shift. After choosing this radio button option, the user is taken to the TimecardEntriesList component where they can input the times and dates worked:

![Alt text](images/Screenshot%202023-06-22%20at%2008.15.32.png)


After clicking save, the screen displays the recorded shift with the option to remove or edit it: 

![Alt text](images/Screenshot%202023-06-22%20at%2008.46.42.png)

When editing the saved time, the function 'isFinishTimeOnNextDay' calculates whether the time is on the next day and the UI notifies the user with dynamic text:

![Alt text](images/Screenshot%202023-06-22%20at%2009.26.14.png)

The date input is conditionally rendered by clicking the checkbox. The dates are automatically inserted. If 'isFinishTimeOnNextDay' is true, the finish date is set to the next day. These can be manually changed: 

![Alt text](images/Screenshot%202023-06-22%20at%2010.14.50.png)

The user is returned to the the Timecard of the start date:

![Alt text](images/Screenshot%202023-06-22%20at%2010.20.38.png)

If the user navigates to the Next day, we remain on this shift so 'Shift (continued)' is displayed: 

![Alt text](images/Screenshot%202023-06-22%20at%2010.56.08.png)

## To be noted:

Validation is in place to prevent invalid time iputs: 

![Alt text](images/Screenshot%202023-06-22%20at%2011.19.05.png)


A banner notifying the user that their hours have been changed is displayed only if the day is edited to move from the current timecard date:

![Alt text](images/Screenshot%202023-06-22%20at%2011.51.30.png)

Finish time can be left blank without error, the system will asume the finish date is the same day:

![Alt text](images/Screenshot%202023-06-22%20at%2011.20.58.png)



## Outstanding tasks which impact Timecard:

The dynamic text 'Finishes next day' would be changed to display the shift length as the user types - https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2605

The user would be able to cancel a shift creation - https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2132

Remove react hook forms from the ui for better data control and simplicity - https://collaboration.homeoffice.gov.uk/jira/browse/EAHW-2748



