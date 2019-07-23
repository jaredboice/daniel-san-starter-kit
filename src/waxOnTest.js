const production = process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'dev';
const {
    STANDARD_EVENT,
    STANDARD_EVENT_ROUTINE,
    STANDARD_EVENT_REMINDER,
    NTH_WEEKDAYS_OF_MONTH,
    NTH_WEEKDAYS_OF_MONTH_ROUTINE,
    NTH_WEEKDAYS_OF_MONTH_REMINDER,
    WEEKDAY_ON_DATE,
    WEEKDAY_ON_DATE_ROUTINE,
    WEEKDAY_ON_DATE_REMINDER,
    MOVE_THIS_PROCESS_DATE_BEFORE_THESE_WEEKDAYS,
    MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
    MOVE_THIS_PROCESS_DATE_AFTER_THESE_WEEKDAYS,
    MOVE_THIS_PROCESS_DATE_AFTER_THESE_DATES,
    ADJUST_AMOUNT_ON_THESE_DATES,
    ANNUALLY,
    MONTHLY,
    WEEKLY,
    DAILY,
    ONCE,
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    STANDARD_TERMINAL_OUTPUT,
    SHY,
    VERBOSE,
    CONCISE,
    DISPLAY_EVENTS_BY_GROUPS,
    DISPLAY_EVENTS_BY_NAMES,
    DISPLAY_EVENTS_BY_TYPES,
    DISPLAY_EVENTS,
    DISPLAY_CRITICAL_SNAPSHOTS,
    DISPLAY_DISCARDED_EVENTS,
    DISPLAY_IMPORTANT_EVENTS,
    DISPLAY_TIME_EVENTS,
    DISPLAY_ROUTINE_EVENTS,
    DISPLAY_REMINDER_EVENTS,
    DISPLAY_RULES_TO_RETIRE,
    DISPLAY_SUM_OF_ALL_NEGATIVE_EVENT_AMOUNTS,
    DISPLAY_SUM_OF_ALL_POSITIVE_EVENT_AMOUNTS,
    DISPLAY_END_BALANCE_SNAPSHOTS_GREATER_THAN_MAX_AMOUNT,
    DISPLAY_END_BALANCE_SNAPSHOTS_LESS_THAN_MIN_AMOUNT,
    DISPLAY_GREATEST_END_BALANCE_SNAPSHOTS,
    DISPLAY_LEAST_END_BALANCE_SNAPSHOTS
} = production ? require('daniel-san/constants') : require('./danielSanDevelopment/constants');

const WEEKENDS = [SATURDAY, SUNDAY];
/* BANK_HOLIDAYS
    New Year's Day
    Martin Luther King Day
    President's Day
    Easter
    Memorial Day
    Independence Day
    Labor Day
    Columbus Day
    Veteran's Day
    Thanksgiving Day
    Christmas Eve
    Christmas Day
    New Year's Eve
*/
const BANK_HOLIDAYS = [
    '2019-01-01',
    '2019-01-21',
    '2019-02-18',
    '2019-04-21',
    '2019-05-27',
    '2019-07-04',
    '2019-09-02',
    '2019-10-14',
    '2019-11-11',
    '2019-11-28',
    '2019-12-24',
    '2019-12-25',
    '2019-12-31'
];

const danielSan = {
    beginBalance: 2445.0,
    endBalance: null,
    dateStart: '2019-09-14',
    dateEnd: '2020-02-02',
    rules: [],
    events: [] // future balance projections stored here
};

const terminalOptions = {
    type: STANDARD_TERMINAL_OUTPUT,
    mode: CONCISE,
    selectionAmount: 10,
    maxAmount: 1000,
    minAmount: 500,
    criticalThreshold: 200.00
};

const monthlyEssentials = [
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'rent',
        amount: -1260.0,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '01',
        sortPriority: 10,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'health insurance and dental',
        amount: -400.0,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '01',
        sortPriority: 20,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'xfinity',
        amount: -85.0,
        dateStart: '2019-05-02',
        dateEnd: null,
        processDate: '02',
        sortPriority: 20,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'visa',
        amount: -50.0,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '15',
        sortPriority: 20,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'gas',
        amount: -75.0,
        syncDate: '2019-06-16',
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: SUNDAY,
        modulus: 3,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'oil change',
        amount: -75.0,
        syncDate: '2019-08-15',
        dateStart: '2019-08-15',
        dateEnd: null,
        processDate: '15',
        modulus: 5,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'electric',
        amount: -125.0,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '19',
        sortPriority: 20,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'water',
        amount: -20.0,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '01',
        sortPriority: 20,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'progressive',
        amount: -150.0,
        dateStart: '2019-08-08',
        dateEnd: null,
        processDate: '13',
        sortPriority: 30,
        modulus: 1,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'at&t',
        amount: -85.0,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '28',
        sortPriority: 20,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: ADJUST_AMOUNT_ON_THESE_DATES,
                dates: ['2019-06-28'],
                amounts: [75.0] // dates and amounts are parallel arrays
            },
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    }
];

const monthlyEntertainment = [
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'cartridges',
        amount: -220.0,
        dateStart: '2019-10-15',
        dateEnd: null,
        processDate: '15',
        modulus: 3,
        cycle: 3
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'netflix',
        amount: -12.5,
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: '24',
        sortPriority: 80,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: ANNUALLY,
        name: 'amazon prime',
        amount: -125.0,
        dateStart: '2018-06-07',
        dateEnd: null,
        processDate: '06-07',
        sortPriority: 80,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    }
];

const weeklyEssentials = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'dry cleaning',
        amount: -16.0,
        syncDate: '2018-17-12',
        dateStart: null,
        dateEnd: null,
        processDate: FRIDAY,
        sortPriority: 80,
        modulus: 2,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'groceries',
        amount: -125.0,
        syncDate: '2018-11-27',
        dateStart: null,
        dateEnd: null,
        processDate: SUNDAY,
        sortPriority: 80,
        modulus: 1,
        cycle: 1,
        specialAdjustments: [
            {
                type: ADJUST_AMOUNT_ON_THESE_DATES,
                dates: ['2019-06-09'],
                amounts: [125.0] // dates and amounts are parallel arrays
            }
        ]
    }
];

const weeklyEntertainment = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'friday entertainment',
        amount: -40.0,
        syncDate: '2018-11-27',
        dateStart: null,
        dateEnd: null,
        processDate: FRIDAY,
        sortPriority: 200,
        modulus: 1,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'saturday entertainment',
        amount: -40.0,
        syncDate: '2018-11-27',
        dateStart: null,
        dateEnd: null,
        processDate: SATURDAY,
        sortPriority: 200,
        modulus: 1,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'sunday entertainment',
        amount: -25.0,
        syncDate: '2018-11-27',
        dateStart: null,
        dateEnd: null,
        processDate: SUNDAY,
        sortPriority: 200,
        modulus: 1,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'lost vape orion: pods',
        amount: -15.0,
        syncDate: '2019-06-30',
        dateStart: '2019-06-30',
        dateEnd: null,
        processDate: SUNDAY,
        sortPriority: 200,
        modulus: 1,
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'lost vape orion: cbd oil',
        amount: -55.0,
        syncDate: '2019-07-07',
        dateStart: '2019-07-07',
        dateEnd: null,
        processDate: SUNDAY,
        sortPriority: 200,
        modulus: 3,
        cycle: 1
    }
];

const biweeklyChecks = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'florida blue income',
        amount: 1622.00,
        syncDate: '2018-12-02',
        dateStart: '2018-12-02',
        dateEnd: null,
        processDate: FRIDAY,
        sortPriority: 50,
        modulus: 2,
        cycle: 2,
        specialAdjustments: [
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    }
];

const annualBills = [
    {
        type: STANDARD_EVENT,
        frequency: ANNUALLY,
        name: 'New Years Blast',
        amount: -30.0,
        dateStart: '2018-12-01',
        dateEnd: null,
        processDate: '12-31',
        sortPriority: 200
    }
];

const rules = [
    ...monthlyEssentials,
    ...monthlyEntertainment,
    ...weeklyEssentials,
    ...weeklyEntertainment,
    ...biweeklyChecks,
    ...annualBills
];

danielSan.rules = rules;

module.exports = {
    danielSan,
    terminalOptions
};
