import { Locator } from '@playwright/test'
import { PagesCore } from '../core/pages.core'

export class HomePage extends PagesCore {
  private _hamburgerMenu = this.page.locator('#react-burger-menu-btn')
  private _logoutBtn = this.page.locator('#logout_sidebar_link')
  private _productList = this.page.locator('.inventory_item_name ')
  private _itemCards = this.page.locator('.inventory_item')
  private _shoppingCartBadge = this.page.locator(
    '#shopping_cart_container > a > span'
  )

  get hamburgerMenu(): Locator {
    console.log(this._hamburgerMenu)
    return this._hamburgerMenu
  }

  get logoutBtn(): Locator {
    return this._logoutBtn
  }

  get productList(): Locator {
    return this._productList
  }

  get shoppingCartBadge(): Locator {
    return this._shoppingCartBadge
  }

  getAddToCartBtnByProductName(productName: string): Locator {
    const itemCard = this._itemCards.filter({ hasText: productName })
    return itemCard.locator('.btn')
  }
}
