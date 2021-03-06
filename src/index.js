require('dotenv').config();

const ENV = process.env.NODE_ENV;
const findBalance = require('daniel-san');
const createReport = require('daniel-san/reporting');

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
const craneKick = findBalance(waxOn.danielSan);
console.timeEnd('processing time'); // eslint-disable-line no-console
createReport({
    danielSan: craneKick.danielSan,
    controller: waxOn.reportController,
    originalDanielSan: waxOn.danielSan,
    error: craneKick.err
});
console.timeEnd('processing + output time'); // eslint-disable-line no-console
console.log(`>>> environment: ${ENV}`); // eslint-disable-line no-console
