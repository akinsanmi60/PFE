/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-unused-vars */
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom';

type CustomMatchers<R = unknown> = TestingLibraryMatchers<
  typeof expect.stringContaining,
  R
>;

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}

//The trick is to import only the matchers from jest-dom and extend them manually with expect.extend(matchers).
// The default way does not work because jest - dom expects the Jest expect method to be in the global scope and tries to use it to extend its matchers.
//But because we use Vitest we need to extend the Vitest expect method explicitly.
