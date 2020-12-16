# E2E config
Default setup for Puppeteer and Protractor tests.

## Installation

```bash
$ npm install coge2e --global
```

## Usage

```bash
$ coge2e init
```
Running this command will init setup and allow to select which configuration should be added.

## Protractor setup
### Running the tests
To run test with default configuration:
```
npm run test
```
There are two ways to run Protractor tests on specific environment: one way is to add another parameter  `--params.env [env_name]`. List of available environment you an find in `/data/env.json`. The second way, easiest, is to run specific npm script: by default, configuration comes with 4 environments:
- `local` - default environment which is tested when `npm run test` is executed
- `dev`
- `staging`
- `prod`

In order to run tests on, for example, on `prod` environment simply run `npm run test:prod`
```
npm run test --params.env staging
/* or */
npm run test:staging
```
Real life example:
```
npm run test
    --suite homepage
    --exclude tests/analytics/homepage.js
    --params.env prod

/* or */

npm run test:prod
    --suite homepage
    --exclude tests/analytics/homepage.js

```

### How to write Protractor tests
* Get familiar with technology stack:
    * https://www.protractortest.org/
    * https://jasmine.github.io/
* Read about:
    * [Page Objects](https://www.protractortest.org/#/page-objects)
    * [Styleguide for Protractor](https://github.com/CarmenPopoviciu/protractor-styleguide)

## Puppeteer & Jest setup
### Running the tests

Similar to Protractor config, default configuration comes with 4 default environments:
- `local` - default environment which is tested when `npm run test` is executed
- `dev`
- `staging`
- `prod`

Tests can be run on specific environment by running scripts like `npm run test:prod`. The only difference is that it's not possible to pass arguments like `--params.env prod` to the script, so trying to run `npm run test --params.env prod` will result in error. The only acceptable arguments are those that are available for [Jest CLI](https://jestjs.io/docs/en/cli) options.

### How to write Puppeteer tests
* Puppeteer Github page
    * https://github.com/GoogleChrome/puppeteer
* Jest
    * [Getting started](https://jestjs.io/docs/en/getting-started)

## License
MIT
