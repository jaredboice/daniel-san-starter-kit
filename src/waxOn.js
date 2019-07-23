const {
    STANDARD_EVENT,
    MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES,
    ADJUST_AMOUNT_ON_THESE_DATES,
    ANNUALLY,
    MONTHLY,
    WEEKLY,
    DAILY,
    SUNDAY,
    FRIDAY,
    SATURDAY,
    STANDARD_TERMINAL_OUTPUT,
    CONCISE
} = require('daniel-san/constants');

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
]; // bank holidays will need to be added for each projected year, in this case they only extend to the end of 2019

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
]; // corporate holidays will need to be added for each projected year

const danielSan = {
    beginBalance: 2500.0, // see the readme for multi-currency options
    endBalance: null,
    dateStart: '2019-07-20',
    dateEnd: '2021-09-11',
    rules: [], // the rules defined below will be assigned to this array, prior to export, at the bottom of the file
    events: [] // future balance projections stored here
};

const terminalOptions = {
    type: STANDARD_TERMINAL_OUTPUT,
    mode: CONCISE,
    criticalThreshold: 150.0
}; // see the readme for more terminal options

const monthlyEssentials = [
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'rent',
        amount: -1200.0,
        dateStart: '2019-07-20',
        dateEnd: null, // an endDate of null signifies an ongoing accounting event
        processDate: '01', // the 1st of each frequency, in this case it will be the 1st of every month
        sortPriority: 10, // the lower the number the higher the sort priority (for identical processDates)
        specialAdjustments: [
            // this special adjustment will trigger the event prior to these dates/days, which is something banks typically do for automated withdrawals
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
        name: 'student loan',
        amount: -150.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '01',
        sortPriority: 20,
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
        name: 'credit card',
        amount: -100.0,
        dateStart: '2019-07-20',
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
        frequency: MONTHLY,
        name: 'car payment',
        amount: -250.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '02',
        sortPriority: 20,
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
        name: 'internet',
        amount: -85.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '02',
        sortPriority: 20,
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
        name: 'health insurance',
        amount: -180.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '20',
        sortPriority: 30
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'car insurance',
        amount: -100.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '13',
        sortPriority: 30
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'phone bill',
        amount: -85.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '28',
        sortPriority: 20,
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
        name: 'electric',
        amount: -125.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '17',
        sortPriority: 20,
        specialAdjustments: [
            {
                type: ADJUST_AMOUNT_ON_THESE_DATES, // we just got the bill and expect to be paying $49 less on the process date
                dates: ['2019-07-17'],
                amounts: [49.0] // dates and amounts are parallel arrays
            },
            {
                type: MOVE_THIS_PROCESS_DATE_BEFORE_THESE_DATES, // the moving of process dates should generally come last in the array of adjustments
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
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '01',
        sortPriority: 20,
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
        amount: -30.0,
        syncDate: '2019-07-20', // specify a date to sync this trigger with a particular SUNDAY in the past or future
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: SUNDAY,
        modulus: 3, // fill up the tank every 3rd SUNDAY (this user must live close to work)
        cycle: 1 // the operation gets triggered when cycle reaches the modulus TODO: ?
    },
    {
        type: STANDARD_EVENT,
        frequency: MONTHLY,
        name: 'oil change',
        amount: -35.0,
        syncDate: '2019-07-20',
        dateStart: '2019-07-20',
        dateEnd: null,
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
        dateStart: '2019-07-20',
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
        frequency: MONTHLY,
        name: 'gaming subscription',
        amount: -10.0,
        dateStart: '2019-07-20',
        dateEnd: null,
        processDate: '07',
        sortPriority: 80,
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
        syncDate: null,
        dateStart: null, // if there is no rule-level start date, daniel-san will number crunch to determine the next process date
        dateEnd: null,
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
        syncDate: null,
        dateStart: null,
        dateEnd: null,
        processDate: SUNDAY,
        sortPriority: 80,
        modulus: 1, // every SUNDAY
        cycle: 1
    }
];

const weeklyEntertainment = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'friday entertainment',
        amount: -50.0,
        syncDate: null,
        dateStart: null,
        dateEnd: null,
        processDate: FRIDAY,
        sortPriority: 200, // low priority gets sorted last for an identical processDate
        modulus: 1, // this allows us to opt out of friday night entertainment when we see putting us over the edge
        cycle: 1
    },
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'saturday entertainment',
        amount: -50.0,
        syncDate: null,
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
        syncDate: null,
        dateStart: null,
        dateEnd: null,
        processDate: SUNDAY,
        sortPriority: 200,
        modulus: 1,
        cycle: 1
    }
];

const biweeklyChecks = [
    {
        type: STANDARD_EVENT,
        frequency: WEEKLY,
        name: 'paycheck',
        amount: 1671.25,
        syncDate: '2019-07-20',
        dateStart: '2019-07-20',
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
        amount: -50.0,
        dateStart: '2019-07-20',
        dateEnd: null,
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
        dateStart: '2019-07-20',
        dateEnd: null,
        sortPriority: 80,
        exclusions: {
            // exclude these dates/days
            weekdays: [SATURDAY, SUNDAY],
            dates: [...CORPORATE_HOLIDAYS]
        },
        modulus: 1,
        cycle: 1
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
    terminalOptions
};
