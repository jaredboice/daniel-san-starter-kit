require('dotenv').config();

const ENV = process.env.NODE_ENV;
const findBalance = require('daniel-san');
const terminal = require('daniel-san/terminal');
const errorDisc = require('daniel-san/utility/errorHandling');

let waxOn;
switch (ENV) {
case 'prod':
case 'production':
    waxOn = require('./waxOn'); // eslint-disable-line global-require
    break;
case 'dev':
case 'development':
case 'test':
    waxOn = require('./waxOnTest'); // eslint-disable-line global-require
    break;
default:
    break;
}

const operationResult = findBalance(waxOn.danielSan);
if (operationResult.err) {
    const error = errorDisc(operationResult);
    if (waxOn.terminalOptions) terminal({ error });
} else {
    // eslint-disable-next-line no-lonely-if
    if (waxOn.terminalOptions) {
        terminal({ danielSan: operationResult.danielSan, terminalOptions: waxOn.terminalOptions });
    }
}
