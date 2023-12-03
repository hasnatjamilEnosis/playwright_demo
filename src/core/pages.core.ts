import { Page } from '@playwright/test'

class PagesCore {
  private readonly _page: Page

  constructor(page: Page) {
    this._page = page
  }

  get page(): Page {
    return this._page
  }
}

export { PagesCore }
