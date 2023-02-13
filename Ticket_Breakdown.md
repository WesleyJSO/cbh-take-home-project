# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
FACILITIES
| ID  | NAME  |
|---|---|
| 1  | First facility  |
| 2  | Second Facility  |

AGENTS
| ID  | NAME  |
|---|---|
| 1  | First Agent  |
| 2  | Second Agent  |

SHIFTS
| ID  | NAME  | SHIFT | AGENT_ID | FACILITIY_ID |
|---|---|---|---|---|
| 1  | 2023-02-12  | NOON | 1 | 2 |
| 2  | 2023-02-12  | NIGHT | 2 | 1 |



# 🎫 Ticket 1
>Create a table to add a relation between `Agents` that worked on `Facilities`, this table will allow facilities to add their IDs (codes) to each agent.\
Add to this table a column called `FACILITY_AGENT_CODE` of type `VARCHAR(255)` so that the facility can set any data type.

## New table
FACILITIES_AGENTS
| ID `PRIMARY KEY BIG BIGINT` | FACILITY_AGENT_CODE `VARCHAR(255)` | AGENT_ID `FOREIGN KEY BIGINT`| FACILITIY_ID `FOREIGN KEY BIGINT`|
|---|---|---|---|
| 1  | AGENT_NUMBER_1 | 1 | 2 |
| 2  | NIGHT_SHIFT_AGENT | 2 | 2 |

✔️ Acceptance criteria:
1. Our testing database should have a table called `FACILITIES_AGENTS` with a COLUMN `FACILITY_AGENT_CODE` of type `VARCHAR(255)`
2. Create a composite key to force a facility to have only one record for each agent
2. The table should have two foreign keys, one for the `FACILITIES` table and another for the `AGENTS` table
3. Create the migration to generate this table

⏰ Time/Effort estimated:\
Small: (less than half a day)



# 🎫 Ticket 2
>Create an endpoint to allow a facility to register agent code.
- request header:
```json
authentication: FACILITY_AUTHORIZATION_TOKEN
```
- request body:
``` javascript
{
    "facilityId": LONG,
    "agentId": LONG,
    "facilityAgentCode": "STRING"
}
```
- successfull response:
```json
statusCode: 201 Created
```

- error response for any invalid fields:
```json
statusCode: 400 Bad request
{
    "error": "MESSAGE INFORMING THE SPECIFIC ERROR"
}
```

- error response for any id not found in the database:
```json
statusCode: 404 Not found
{
    "error": "MESSAGE INFORMING THAT THE INFORMED ID WAS NOT FOUND"
}
```

- error response when agent id was already registered:
```json
statusCode: 409 Conflict
{
    "error": "MESSAGE INFORMING THAT AGENT ID WAS ALREADY REGISTERED"
}
```
✔️ Acceptance criteria:
1. The endpoint should be able to create a record in the new table and return the status code 201
2. Create validation tests for each successfull case scenario (201)
3. Create validation tests for each unsuccessfull case scenario mentioned in the task

⏰ Time/Effort estimated:\
Medium: (less than 1 day)


# 🎫 Ticket 3
>Refactor the function `getShiftsByFacility` to fetch the new table `FACILITIES_AGENTS`, get the data in the column `FACILITY_AGENT_CODE`, and return it with the current returned data.

✔️ Acceptance criteria:
1. The function should return the new column data
2. Create new tests to validate that the new data is present in the returned dataset
3. Pass every existing test

⏰ Time/Effort estimated:\
Small: (less than half a day)


# 🎫 Ticket 4
>Refactor the function `generateReport` to add a new column to the report for the data returned by the column `FACILITIES_AGENTS`.`FACILITY_AGENT_CODE`. Consider that if all the records returned by  `getShiftsByFacility` has a non-empty `FACILITY_AGENT_CODE` the column with the internal id shouldn't be present in the report.

✔️ Acceptance criteria:
1. The function should generate a report with the new column and the data should be present and be the same as the database
2. Generate a report with both values, the DB id and facilities id columns
3. Pass every existing test


⏰ Time/Effort estimated:\
Small: (less than half a day)