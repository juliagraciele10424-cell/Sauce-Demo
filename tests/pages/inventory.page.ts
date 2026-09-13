import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SideMenuComponent } from '../components/side-menu.component';

export class InventoryPage extends BasePage {
  readonly burgerButton: Locator;
  readonly sideMenu: SideMenuComponent;

  constructor(page: Page) {
    super(page);

    this.burgerButton = page.getByRole('button', { name: 'Open Menu' });
    this.sideMenu = new SideMenuComponent(page);
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
    await this.sideMenu.expectOpen();
  }

  async openDynamicCatalog(): Promise<void> {
    await this.sideMenu.openDynamicCatalog();
  }

  async expectDynamicCatalogSubmenuOpen(): Promise<void> {
    await this.sideMenu.expectDynamicCatalogSubmenuOpen();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.sideMenu.logoutLink.click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\//);
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
  }
}
