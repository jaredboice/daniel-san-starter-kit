const {
    APP_NAME,
    DEFAULT_ERROR_MESSAGE,
    TIME_DELIMITER,
    DATE_TIME_DELIMITER,
    DATE_FORMAT_STRING,
    TIME_FORMAT_STRING,
    UTC,
    LOCAL,
    AM,
    PM,
    EVENT_SOURCE,
    OBSERVER_SOURCE,
    BOTH,
    ANY,
    UNION,
    INTERSECTION,
    POSITIVE,
    NEGATIVE,
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
    PRE_PAY,
    MOVE_THIS_PROCESS_DATE_AFTER_THESE_WEEKDAYS,
    MOVE_THIS_PROCESS_DATE_AFTER_THESE_DATES,
    POST_PAY,
    ADJUST_AMOUNT_ON_THESE_DATES,
    ADJUST_AMOUNT,
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
    WEEKENDS,
    STANDARD_OUTPUT,
    VERBOSE,
    CONCISE,
    SHY,
    EVENTS_BY_GROUP,
    EVENTS_BY_GROUPS,
    EVENTS_BY_NAME,
    EVENTS_BY_NAMES,
    EVENTS_BY_TYPE,
    EVENTS_BY_TYPES,
    EVENTS_BY_KEYS_AND_VALUES,
    EVENTS,
    CRITICAL_SNAPSHOTS,
    DISCARDED_EVENTS,
    IMPORTANT_EVENTS,
    TIME_EVENTS,
    ROUTINE_EVENTS,
    REMINDER_EVENTS,
    ROUTINE_AND_REMINDER_EVENTS,
    RULES_TO_RETIRE,
    IRRELEVANT_RULES,
    SUM_OF_ALL_POSITIVE_EVENT_FLOWS,
    SUM_OF_ALL_POSITIVE_EVENT_AMOUNTS,
    SUM_OF_ALL_NEGATIVE_EVENT_FLOWS,
    SUM_OF_ALL_NEGATIVE_EVENT_AMOUNTS,
    EVENT_FLOWS_GREATER_THAN_TARGET,
    EVENT_FLOWS_LESS_THAN_TARGET,
    NEGATIVE_EVENT_FLOWS_GREATER_THAN_TARGET,
    NEGATIVE_EVENT_FLOWS_LESS_THAN_TARGET,
    POSITIVE_EVENT_FLOWS_GREATER_THAN_TARGET,
    POSITIVE_EVENT_FLOWS_LESS_THAN_TARGET,
    BALANCE_ENDING_SNAPSHOTS_GREATER_THAN_TARGET,
    BALANCE_ENDING_SNAPSHOTS_LESS_THAN_TARGET,
    GREATEST_BALANCE_ENDING_SNAPSHOTS,
    LEAST_BALANCE_ENDING_SNAPSHOTS,
    GREATEST_EVENT_FLOWS,
    LEAST_EVENT_FLOWS,
    GREATEST_POSITIVE_EVENT_FLOWS,
    LEAST_POSITIVE_EVENT_FLOWS,
    GREATEST_NEGATIVE_EVENT_FLOWS,
    LEAST_NEGATIVE_EVENT_FLOWS,
    EVENT_FLOWS_WITHIN_X_PERCENT_OF_TARGET,
    NEGATIVE_EVENT_FLOWS_WITHIN_X_PERCENT_OF_TARGET,
    POSITIVE_EVENT_FLOWS_WITHIN_X_PERCENT_OF_TARGET,
    BALANCE_ENDING_SNAPSHOTS_WITHIN_X_PERCENT_OF_TARGET,
    AGGREGATES,
    DAY_CYCLES,
    DATE_SETS,
    SUMS_AND_AVERAGES,
    MEDIANS_AND_MODES,
    MINIMUMS_AND_MAXIMUMS,
    GREATEST_VALUES,
    LEAST_VALUES,
    DEFAULT,
    ASCENDING,
    DESCENDING,
    SUM,
    AVERAGE,
    MEDIANS,
    MODES,
    MIN,
    MAX,
    MIN_INT_DIGITS_DEFAULT,
    MIN_DECIMAL_DIGITS_DEFAULT,
    MAX_DECIMAL_DIGITS_DEFAULT,
    LOCALE_DEFAULT,
    STYLE_DEFAULT,
    CURRENCY_DEFAULT,
    RULE,
    EVENT,
    REPORT,
    AGGREGATE,
    AGGREGATE_GROUP,
    DEFAULT_JSON_SPACING,
    DEFAULT_SELECTION_LIMIT
} = require('daniel-san/constants'); // see the readme for more constants

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
    '2019-12-31',
    '2020-01-01',
    '2020-01-20',
    '2020-02-17',
    '2020-04-12',
    '2020-05-25',
    '2020-07-04',
    '2020-09-07',
    '2020-10-12',
    '2020-11-11',
    '2020-11-26',
    '2020-12-24',
    '2020-12-25',
    '2020-12-31',
    '2021-01-01',
    '2021-01-18',
    '2021-02-15',
    '2021-04-04',
    '2021-05-31',
    '2021-07-04',
    '2021-09-06',
    '2021-10-11',
    '2021-11-11',
    '2021-11-25',
    '2021-12-24',
    '2021-12-25',
    '2021-12-31'
]; // bank holidays will need to be added for each projected year, in this case they extend to the end of 2021

const CORPORATE_HOLIDAYS = [
    '2019-01-01',
    '2019-07-04',
    '2019-11-28',
    '2019-11-29',
    '2019-12-24',
    '2019-12-25',
    '2020-01-01',
    '2020-07-04',
    '2020-11-26',
    '2020-11-27',
    '2020-12-24',
    '2020-12-25',
    '2021-01-01'
]; // corporate holidays will need to be added for each projected year, in this case they extend to the end of 2021

const danielSan = {
    config: {
        balanceBeginning: 2500.0, // see the readme for multi-currency options
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: '2021-09-11'
    },
    rules: [], // the rules defined below will be assigned to this array, prior to export, at the bottom of the file
    events: [] // future balance projections stored here
};

const reportController = {
    config: {
        name: 'Daniel-San-Report',
        mode: CONCISE
    },
    rules: [
        {
            name: 'standard events',
            type: STANDARD_OUTPUT,
            criticalThreshold: 150.0
        }
    ]
}; // see the readme for more report options

const monthlyEssentials = [
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'rent',
        amount: -1200.0,
        effectiveDateStart: '2019-07-20', // if there is no rule-level start date, daniel-san will number crunch to determine the next process date
        effectiveDateEnd: null, // an endDate of null signifies an ongoing accounting event
        processDate: '01', // the 1st of each frequency, in this case it will be the 1st of every month
        sortPriority: 10, // the lower the number the higher the sort priority (for identical processDates)
        specialAdjustments: [
            // this special adjustment will trigger the event prior to these dates/days, which is something banks typically do for automated withdrawals
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'student loan',
        amount: -150.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '01',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'credit card',
        amount: -100.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '15',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'car payment',
        amount: -250.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '02',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'internet',
        amount: -85.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '02',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'health insurance',
        amount: -180.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '20',
        sortPriority: 30
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'car insurance',
        amount: -100.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '13',
        sortPriority: 30
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'phone bill',
        amount: -85.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '28',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'electric',
        amount: -125.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '17',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: ADJUST_AMOUNT, // we just got the bill and expect to be paying $49 less on the process date
                dates: ['2019-07-17'],
                amounts: [49.0] // dates and amounts are parallel arrays
            },
            {
                type: PRE_PAY, // the moving of process dates should generally come last in the array of adjustments
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
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '01',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'gas',
        amount: -30.0,
        effectiveDateStart: '2019-07-20', // specify a date to sync the modulus/cycle phase for this trigger with a particular SUNDAY in the past
        // (or a particular SUNDAY in the future, but it will still only cycle moving forward from that point)
        effectiveDateEnd: null,
        processDate: SUNDAY,
        modulus: 3, // fill up the tank every 3rd SUNDAY (this user must live close to work)
        cycle: 1 // the operation gets triggered when cycle reaches the modulus TODO: ?
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'oil change',
        amount: -35.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '15',
        modulus: 3, // every third MONTHLY trigger
        cycle: 1
    }
];

const monthlyEntertainment = [
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'streaming service',
        amount: -15.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '24',
        sortPriority: 80,
        specialAdjustments: [
            {
                type: PRE_PAY,
                dates: [...BANK_HOLIDAYS],
                weekdays: [...WEEKENDS]
            }
        ]
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'gaming subscription',
        amount: -10.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '07',
        sortPriority: 80,
        specialAdjustments: [
            {
                type: PRE_PAY,
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
        effectiveDateStart: '2019-07-20', // specify a effectiveDateStart to sync the modulus/cycle phase with
        effectiveDateEnd: null,
        processDate: FRIDAY,
        sortPriority: 80,
        modulus: 2, // every 2nd FRIDAY
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'groceries',
        amount: -125.0,
        effectiveDateStart: null,
        effectiveDateEnd: null,
        processDate: SUNDAY,
        sortPriority: 80
    }
];

const weeklyEntertainment = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'friday entertainment',
        amount: -50.0,
        effectiveDateStart: null,
        effectiveDateEnd: null,
        processDate: FRIDAY,
        sortPriority: 200 // low priority gets sorted last for an identical processDate
        // this allows us to opt out of friday night entertainment when we see that expense putting us over the edge
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'saturday entertainment',
        amount: -50.0,
        effectiveDateStart: null,
        effectiveDateEnd: null,
        processDate: SATURDAY,
        sortPriority: 200
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'sunday entertainment',
        amount: -25.0,
        effectiveDateStart: null,
        effectiveDateEnd: null,
        processDate: SUNDAY,
        sortPriority: 200
    }
];

const biweeklyChecks = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'paycheck',
        amount: 1671.25,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: FRIDAY,
        sortPriority: 50,
        modulus: 2,
        cycle: 2,
        specialAdjustments: [
            {
                type: PRE_PAY,
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
        name: 'Vehicle Registration',
        amount: -55.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '09-01',
        sortPriority: 10
    },
    {
        type: STANDARD_EVENT,
        frequency: ANNUALLY,
        name: 'New Years Blast',
        amount: -50.0,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        processDate: '12-31',
        sortPriority: 200
    }
];

const weekDayBills = [
    {
        type: STANDARD_EVENT,
        frequency: DAILY,
        name: 'work cafeteria allowance',
        amount: -7.5,
        effectiveDateStart: '2019-07-20',
        effectiveDateEnd: null,
        sortPriority: 80,
        exclusions: {
            // exclude these dates/days
            weekdays: [...WEEKENDS],
            dates: [...CORPORATE_HOLIDAYS]
        }
    }
];

const rules = [
    ...annualBills,
    ...monthlyEssentials,
    ...monthlyEntertainment,
    ...biweeklyChecks,
    ...weeklyEssentials,
    ...weeklyEntertainment,
    ...weekDayBills
];

danielSan.rules = rules;

module.exports = {
    danielSan,
    reportController
};
