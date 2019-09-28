# daniel-san-starter-kit
a budget-projection rule template for cashflow event triggers that utilizes the daniel-san budget-projection engine with reports via terminal or text-file output.

get the [full documentation](https://github.com/jaredboice/daniel-san) at gitHub.

![Daniel-San](screenshots/daniel-san-starter-kit-logo.png 'Daniel-San')

## Donations - Bitcoin: 19XgiRojJnv9VDhyW9HmF6oKQeVc7k9McU 
(use this address until 2022)

## Wax On
waxOn.js is the template file where you define your rule sets for triggering accounting events.

## Environment Variables
Notice in index.js that an environment variable is being used to switch between different rule set files (waxOn.js and waxOnTest.js). Edit this behavior and these files/names according to your preference and budget testing needs.

**execution script**
```javascript
npm run start
```