import { expect } from '@playwright/test'
import { ActionsCore } from '../core/actions.core'
import { CheckoutPage } from '../pages/checkout.page'

export class CheckoutActions extends ActionsCore {
  private _page: CheckoutPage

  constructor(page: CheckoutPage) {
    super(page)
    this._page = page
  }

  async navigateToCheckoutPage() {
    await this._page.checkoutBtn.click()
  }

  async validateCheckoutItem(itemName: string) {
    const checkoutItemNames = await this._page.checkoutItems.allTextContents()
    expect(checkoutItemNames).toContain(itemName)
  }

  async confirmCheckout() {
    await this._page.checkoutCompleteBtn.click()
  }

  async cancelCheckout() {
    await this._page.cancelCheckoutBtn.click()
  }
}
