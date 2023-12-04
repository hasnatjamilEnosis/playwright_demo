import { ActionsCore } from '../../core/actions.core'
import { LoginPage } from '../../pages/login/login.page'

export class LoginActions extends ActionsCore {
  private _page: LoginPage

  constructor(page: LoginPage) {
    super(page)
    this._page = page
  }

  async login(username: string, password: string) {
    await this._page.usernameField.fill(username)
    await this._page.passwordField.fill(password)
    await this._page.loginBtn.click()
  }
}
