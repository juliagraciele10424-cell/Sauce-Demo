import { test as base } from '@playwright/test';

export const sauceDemoCredentials = {
  username: 'problem_user',
  password: 'secret_sauce',
};

export type SauceDemoCredentials = typeof sauceDemoCredentials;

export const test = base.extend<{ auth: SauceDemoCredentials }>({
  auth: async ({}, use) => {
    await use(sauceDemoCredentials);
  },
});

export { expect } from '@playwright/test';
