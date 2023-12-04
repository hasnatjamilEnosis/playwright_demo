import { Locator } from '@playwright/test'
import { PagesCore } from '../core/pages.core'

export class CheckoutPage extends PagesCore {
  private _checkoutBtn = this.page.locator('#shopping_cart_container > a')
  private _checkoutItems = this.page.locator('.inventory_item_name')
  private _checkoutCompleteBtn = this.page.locator('#checkout')
  private _cancelCheckoutBtn = this.page.locator('#cancel')

  get checkoutBtn(): Locator {
    return this._checkoutBtn
  }

  get checkoutItems(): Locator {
    return this._checkoutItems
  }

  get checkoutCompleteBtn(): Locator {
    return this._checkoutCompleteBtn
  }

  get cancelCheckoutBtn(): Locator {
    return this._cancelCheckoutBtn
  }
}
