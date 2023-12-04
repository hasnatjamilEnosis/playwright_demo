import { expect } from '@playwright/test'
import { ActionsCore } from '../core/actions.core'
import { HomePage } from '../pages/home.page'

export class HomeActions extends ActionsCore {
  private _page: HomePage

  constructor(page: HomePage) {
    super(page)
    this._page = page
  }

  async logout() {
    await this._page.hamburgerMenu.click()
    await this._page.logoutBtn.click()
  }

  async validateItemAvailability(itemName: string) {
    const itemNames = await this._page.productList.allTextContents()
    expect(itemNames).toContain(itemName)
  }

  async addItemToCart(itemName: string) {
    await this._page.getAddToCartBtnByProductName(itemName).click()
  }

  async validateShoppingCartBadgeCount(expectedValue: string) {
    await expect(this._page.shoppingCartBadge).toHaveText(expectedValue)
  }
}
