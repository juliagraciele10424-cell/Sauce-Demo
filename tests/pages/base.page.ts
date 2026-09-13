import { type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
