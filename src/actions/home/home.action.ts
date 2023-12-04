import { ActionsCore } from '../../core/actions.core'
import { HomePage } from '../../pages/home/home.page'

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
}
