import _ from 'lodash';

const MESSAGES = {
  propertiesNotMatch: 'Following properties does not match:',
  propertyCompare: (property, actualValue, value) => `Property: ${property}: ${actualValue} != ${value}`,
  propertyNotDefined: property => `${property} is not defined in object`,
  propertyDefined: 'Property defined',
};

export const toMatchDataLayerDefinition = () => ({
  compare: (actual, expected) => {
    const result = {};
    const mismatch = [];

    _.forIn(expected, (value, property) => {
      const actualValue = _.get(actual, property);
      if (!_.isEqual(actualValue, value)) {
        mismatch.push(MESSAGES.propertyCompare(property, actualValue, value));
      }
    });

    result.pass = mismatch.length === 0;
    result.message = `${MESSAGES.propertiesNotMatch} ${mismatch.join('\n')}`;

    return result;
  },
});

export const toContainDataLayerPropertyDefinition = () => ({
  compare: (actual, expected) => {
    const propertyDefinition = _.get(actual, expected);
    const passed = !_.isUndefined(propertyDefinition);

    return {
      pass: passed,
      message: passed ? MESSAGES.propertyNotDefined(propertyDefinition) : MESSAGES.propertyDefined,
    };
  },
});
