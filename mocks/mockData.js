const { createTimeEntry } = require('./mock-utils');
const dayjs = require('dayjs');

const accruals = [
  {
    endOfAgreementDate: '2022-03-31',
    summaries: [
      {
        type: 'HOURS',
        category: 'WEEKEND_HOURS',
        currentState: {
          amount: { hours: 117, minutes: 43 },
          status: 'DEFICIT',
          severe: false,
        },
        balance: { hours: 140, minutes: 0, directionality: 'POSITIVE' },
        purchased: { hours: 226, minutes: 0 },
        target: { hours: 22, minutes: 17 },
      },
      {
        type: 'HOURS',
        category: 'STANDARD_HOURS',
        currentState: {
          amount: { hours: 1023, minutes: 13 },
          status: 'DEFICIT',
          severe: false,
        },
        balance: { hours: 1161, minutes: 30, directionality: 'POSITIVE' },
        purchased: { hours: 1402, minutes: 0 },
        target: { hours: 138, minutes: 17 },
      },
      {
        type: 'HOURS',
        category: 'PUBLIC_HOLIDAY_HOURS',
        currentState: {
          amount: { hours: 36, minutes: 57 },
          status: 'DEFICIT',
          severe: false,
        },
        balance: { hours: 41, minutes: 0, directionality: 'POSITIVE' },
        purchased: { hours: 41, minutes: 0 },
        target: { hours: 4, minutes: 3 },
      },
      {
        type: 'NIGHT_SHIFTS_RATIO',
        category: 'SHIFTS',
        purchasedBand: 'D',
        trackingAtBand: 'A',
        nightShiftsCount: 8,
        ratio: { denominator: 3.8, numerator: 1 },
        allShiftsCount: 30,
      },
      {
        type: 'HOURS',
        category: 'NIGHT_HOURS',
        currentState: {
          amount: { hours: 284, minutes: 43 },
          status: 'DEFICIT',
          severe: false,
        },
        balance: { hours: 322, minutes: 0, directionality: 'POSITIVE' },
        purchased: { hours: 378, minutes: 0 },
        target: { hours: 37, minutes: 17 },
      },
    ],
  },
];

const artists = [
  {
    artist_id: 1,
    profile_id: 1,
    performance_name: 'Beautiful South',
  },
  {
    artist_id: 2,
    profile_id: 2,
    performance_name: 'Oasis',
  },
  {
    artist_id: 3,
    profile_id: 3,
    performance_name: 'Pink',
  },
  {
    artist_id: 4,
    profile_id: 4,
    performance_name: 'Adele',
  },
  {
    artist_id: 5,
    profile_id: 5,
    performance_name: 'Beach Boys',
  },
  {
    artist_id: 6,
    profile_id: 6,
    performance_name: 'Mock Queen',
  },
];

const people = [
  {
    id: 1,
    personId: 'fa8aac4a-5614-4fc9-9ff9-910d24ae55a7',
    organisationId: '675f4bb9-5e79-404c-bb66-2d9171b79802',
    foreName: 'Shaunta',
    familyName: 'Hermann',
    grade: 'HEO',
    role: 'MANAGER',
  },
  {
    id: 2,
    personId: 'e087b879-eafe-47ad-b694-418f0f5abdbc',
    organisationId: 'e6b5c8b5-7ea3-4303-850e-d8b59006e1df',
    foreName: 'Jamika',
    familyName: 'Kohler',
    grade: 'G7',
    role: 'MANAGER',
  },
  {
    personId: '45ec7c81-a31c-42ad-a69a-aaf35764ca68',
    organisationId: 'a83b28f4-62da-41ac-9ff9-81be33a17f5a',
    foreName: 'NoFinishTime',
    familyName: 'User',
    grade: 'AA',
    role: 'PLANNER',
  },
  {
    personId: 'a2ec6551-4a25-4d39-9154-2ae58976c9db',
    organisationId: 'a5252fc8-b2f3-48c5-8eea-545f6a86d1e0',
    foreName: 'ShiftTest',
    familyName: 'User',
    grade: 'AA',
    role: 'PLANNER',
  },
  {
    personId: 'd2ab07f3-2865-47d8-a3f9-60c5db744a6d',
    organisationId: 'c1c2d01f-83d9-4ef8-a0f4-2f53dcd41c41',
    foreName: 'ShiftCount',
    familyName: 'User',
    grade: 'AA',
    role: 'PLANNER',
  },
  {
    personId: 'e8eccdc9-4f80-4848-875d-983f28f5ab79',
    organisationId: '0de94b00-805a-4bc2-97f6-b9ac9025c4c0',
    foreName: 'Aja',
    familyName: 'Wunsch',
    grade: 'HEO',
    role: 'PLANNER',
  },
  {
    personId: 'bd1e2d45-4ca1-41b3-b7cd-f988ccf05853',
    organisationId: '79590ae1-ae1c-4b83-9a97-9ccce7a97d68',
    foreName: 'Fidel',
    familyName: 'Kirlin',
    grade: 'SEO',
    role: 'PLANNER',
  },
  {
    personId: 'c5f63d63-a714-4349-b833-88c20386ed3b',
    organisationId: '0de94b00-805a-4bc2-97f6-b9ac9025c4c0',
    foreName: 'Toi',
    familyName: 'Reynolds',
    grade: 'G6',
    role: 'USER',
  },
  {
    personId: '1356abea-2e41-4410-8283-801d510ca3c7',
    organisationId: '0de94b00-805a-4bc2-97f6-b9ac9025c4c0',
    foreName: 'Juan',
    familyName: 'Bauch',
    grade: 'AO',
    role: 'MANAGER',
  },
  {
    personId: '18f36830-d3af-4927-a6f0-fd2c3219a48b',
    organisationId: '0de94b00-805a-4bc2-97f6-b9ac9025c4c0',
    foreName: 'Alise',
    familyName: 'Adams',
    grade: 'HEO',
    role: 'ADMIN',
  },
];

const userId = '9e47cf29-1598-4269-aa31-db1d2e4e0207';

const shiftTimeEntry = createTimeEntry({
  id: 'c0a80040-82cf-1986-8182-cfedbbd50003',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  actualStartTime: dayjs('2022-07-01T12:00:00Z').format('YYYY-MM-DDTHH:mm:ssZ'),
  actualEndTime: dayjs('2022-07-01T22:00:00Z').format('YYYY-MM-DDTHH:mm:ssZ'),
});

const shiftTimeEntryWithoutFinishTime = createTimeEntry({
  id: 'c0a80040-82cf-1986-8182-cfedbbd50004',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  ownerId: userId,
  actualStartTime: dayjs().hour(12).minute(0).format('YYYY-MM-DDTHH:mm:ssZ'),
  actualEndTime: null,
});

const shiftTimeEntryMultipleDays = createTimeEntry({
  id: 'c0a80040-82cf-1986-8182-cfedbbd50005',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000001',
  ownerId: userId,
  actualStartTime: dayjs('2022-01-30T00:00:00Z').format('YYYY-MM-DDTHH:mm:ssZ'),
  actualEndTime: dayjs('2022-02-02T00:00:00Z').format('YYYY-MM-DDTHH:mm:ssZ'),
});

const srdEntry = createTimeEntry({
  id: '0a650b0a-8346-158f-8183-471def7e0004',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000002',
  ownerId: userId,
  actualStartTime: dayjs()
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ssZ'),
  actualEndTime: dayjs()
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ssZ'),
});

const nwdEntry = createTimeEntry({
  id: 'fea873ad-147b-4e2d-92ac-f36c47015eaf',
  timePeriodTypeId: '00000000-0000-0000-0000-000000000003',
  ownerId: userId,
  actualStartTime: dayjs()
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ssZ'),
  actualEndTime: dayjs()
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ssZ'),
});

const timePeriodIdForTimeEntry = {
  '00000000-0000-0000-0000-000000000001': shiftTimeEntry,
  '00000000-0000-0000-0000-000000000002': srdEntry,
  '00000000-0000-0000-0000-000000000003': nwdEntry,
};

const timeCardPeriodTypes = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'Shift',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'Scheduled rest day',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'Non-working day',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'On call',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'Absence',
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'Training',
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    tenantId: '00000000-0000-0000-0000-000000000000',
    name: 'Overtime',
  },
];

const shiftTimeCardPeriodType = {
  meta: {
    next: null,
  },
  items: [
    {
      id: '00000000-0000-0000-0000-000000000001',
      tenantId: '00000000-0000-0000-0000-000000000000',
      name: 'Shift',
    },
  ],
};

const timeEntryFilter =
  "ownerId=='00000000-0000-0000-0000-000000000000'&&actualStartTime>='2022-10-28T00:00:00+00:00'&&actualStartTime<='2022-10-29T23:59:00+00:00'||ownerId=='00000000-0000-0000-0000-000000000000'&&actualEndTime>='2022-10-29T00:00:00+00:00'&&actualEndTime<='2022-10-30T23:59:00+00:00'";

module.exports = {
  shiftTimeEntry,
  shiftTimeEntryWithoutFinishTime,
  shiftTimeEntryMultipleDays,
  userId,
  srdEntry,
  nwdEntry,
  timePeriodIdForTimeEntry,
  timeCardPeriodTypes,
  timeEntryFilter,
  shiftTimeCardPeriodType,
  accruals,
  people,
  artists,
};
