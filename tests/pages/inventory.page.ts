import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly burgerButton: Locator;
  readonly sideMenu: Locator;
  readonly inventoryLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);

    this.burgerButton = page.getByRole('button', { name: 'Open Menu' });
    this.sideMenu = page.locator('.bm-menu-wrap');
    this.inventoryLink = page.getByText('All Items');
    this.logoutLink = page.getByText('Logout');
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Products')).toBeVisible();
    await expect(this.burgerButton).toBeVisible();
  }

  async openMenu(): Promise<void> {
    await this.burgerButton.click();
  }

  async expectMenuOpen(): Promise<void> {
    await expect(this.sideMenu).toBeVisible();
    await expect(this.inventoryLink).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\//);
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
  }
}
