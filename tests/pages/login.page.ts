import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async loginWith({ username, password }: { username: string; password: string }): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }
}
