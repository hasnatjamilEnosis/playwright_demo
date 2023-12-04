import { Page } from '@playwright/test'
import { PagesCore } from '../../core/pages.core'

class LoginPage extends PagesCore {
  constructor(page: Page) {
    super(page)
  }
}
