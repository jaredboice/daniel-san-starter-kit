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
case 'develop':
case 'development':
case 'test':
case 'local':
    waxOn = require('./waxOnTest'); // eslint-disable-line global-require
    break;
default:
    break;
}

console.time('processing + output time'); // eslint-disable-line no-console
console.log(`>>> environment: ${ENV}`); // eslint-disable-line no-console
console.time('processing time'); // eslint-disable-line no-console
const operationResult = findBalance(waxOn.danielSan);
console.timeEnd('processing time'); // eslint-disable-line no-console
if (operationResult.err) {
    const error = errorDisc(operationResult);
    if (waxOn.terminalOptions) terminal({ error });
} else {
    // eslint-disable-next-line no-lonely-if
    if (waxOn.terminalOptions) {
        terminal({ danielSan: operationResult.danielSan, terminalOptions: waxOn.terminalOptions, originalDanielSan: waxOn.danielSan });
    }
}
console.timeEnd('processing + output time'); // eslint-disable-line no-console
console.log(`>>> environment: ${ENV}`); // eslint-disable-line no-console
