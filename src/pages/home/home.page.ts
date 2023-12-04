import { Locator } from '@playwright/test'
import { PagesCore } from '../../core/pages.core'

export class HomePage extends PagesCore {
  private _hamburgerMenu = this.page.locator('#react-burger-menu-btn')
  private _logoutBtn = this.page.locator('#logout_sidebar_link')

  get hamburgerMenu(): Locator {
    console.log(this._hamburgerMenu)
    return this._hamburgerMenu
  }

  get logoutBtn(): Locator {
    return this._logoutBtn
  }
}
