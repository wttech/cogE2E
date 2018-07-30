const toBeAriaInvalid = () => ({
  compare: (actual) => {
    const result = {
      pass: actual === 'true',
    };

    if (result.pass) {
      result.message = `Expected form field aria-invalid attribute ${actual} not to be true`;
    } else {
      result.message = `Expected form field aria-invalid attribute ${actual} to be true`;
    }

    return result;
  },
});

export default toBeAriaInvalid;
