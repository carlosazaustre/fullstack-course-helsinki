import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';

const originalError = console.error;

beforeAll(() => {
  /* Removes the warning related to:
  * An update to App inside a test was not wrapped in act(...).
  * When testing, code that causes React state updates should be wr
  * apped into act(...)
  */
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
