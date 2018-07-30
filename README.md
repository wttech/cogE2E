## Protractor and Gradle setup
### Running the tests
To run test with default configuration:
```
npm run test
// or
yarn test
```

To run Protractor tests on specific environment just add another parameter  `--params.env [env_name]`. List of available environment you an find in `/data/env.json`.
```
npm run test --params.env int
```
Real life example:
```
npm run test
    -Pargs="-capabilities.maxInstances=4
    --suite homepage
    --exclude tests/analytics/homepage.js
    --params.env int"
```

### How to write protractor tests
* Get familiar with technology stack:
    * https://www.protractortest.org/
    * https://jasmine.github.io/
    * ES6 features:
        * Classes and sub-classes
        * Promises
        * Arrow functions
        * Modules
* Read about:
    * [Page Objects](https://www.protractortest.org/#/page-objects)
    * [Styleguide for Protractor](https://github.com/CarmenPopoviciu/protractor-styleguide)
