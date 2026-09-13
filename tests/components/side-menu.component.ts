import { type Locator, type Page, expect } from '@playwright/test';

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class SideMenuComponent {
  readonly menu: Locator;
  readonly inventoryLink: Locator;
  readonly dynamicCatalogLink: Locator;
  readonly dynamicCatalogSubmenu: Locator;
  readonly lazyLoadLink: Locator;
  readonly spinnerLink: Locator;
  readonly sliderLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.menu = page.locator('.bm-menu-wrap');
    this.inventoryLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.dynamicCatalogLink = page.locator('[data-test="dynamic-catalog-sidebar-link"]');
    this.dynamicCatalogSubmenu = page.locator('#dynamic_catalog_submenu');
    this.lazyLoadLink = page.locator('[data-test="dynamic-catalog-lazy-load-link"]');
    this.spinnerLink = page.locator('[data-test="dynamic-catalog-spinner-link"]');
    this.sliderLink = page.locator('[data-test="dynamic-catalog-slider-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async expectOpen(): Promise<void> {
    await expect(this.menu).toBeVisible();
    await expect(this.inventoryLink).toBeVisible();
  }

  async openDynamicCatalog(): Promise<void> {
    await this.dynamicCatalogLink.click();
  }

  async expectDynamicCatalogSubmenuOpen(): Promise<void> {
    await expect(this.dynamicCatalogLink).toHaveAttribute('aria-expanded', 'true');
    await expect(this.dynamicCatalogSubmenu).toBeVisible();

    await expect(this.lazyLoadLink).toBeVisible();
    await expect(this.spinnerLink).toBeVisible();
    await expect(this.sliderLink).toBeVisible();

    const [lazyLoadBox, spinnerBox, sliderBox] = await Promise.all([
      this.visibleBox(this.lazyLoadLink),
      this.visibleBox(this.spinnerLink),
      this.visibleBox(this.sliderLink),
    ]);

    expect(Math.abs(lazyLoadBox.y - spinnerBox.y)).toBeLessThanOrEqual(2);
    expect(Math.abs(spinnerBox.y - sliderBox.y)).toBeLessThanOrEqual(2);
    expect(spinnerBox.x).toBeGreaterThan(lazyLoadBox.x);
    expect(sliderBox.x).toBeGreaterThan(spinnerBox.x);
  }

  private async visibleBox(locator: Locator): Promise<Box> {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();

    return box as Box;
  }
}
