/* eslint-disable playwright/expect-expect */
import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { LoginActions } from '../actions/login.action'
import { HomeActions } from '../actions/home.action'
import loginData from '../data/login/login.data.json'
import checkoutData from '../data/checkout/checkout.data.json'
import { HomePage } from '../pages/home.page'
import { CheckoutPage } from '../pages/checkout.page'
import { CheckoutActions } from '../actions/checkout.action'

test.describe('Saucelab validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    const loginActions = new LoginActions(loginPage)
    await loginActions.navigateToSite()
    await loginActions.login(loginData.username, loginData.password)
  })

  test('validate the shopping cart functionality', async ({ page }) => {
    const homePage = new HomePage(page)
    const homeActions = new HomeActions(homePage)
    const checkoutPage = new CheckoutPage(page)
    const checkoutAction = new CheckoutActions(checkoutPage)

    await homeActions.validateItemAvailability(
      checkoutData.checkoutItemJacketTitle
    )
    await homeActions.addItemToCart(checkoutData.checkoutItemJacketTitle)
    await homeActions.validateItemAvailability(
      checkoutData.checkoutItemOnesieTitle
    )
    await homeActions.addItemToCart(checkoutData.checkoutItemOnesieTitle)
    await homeActions.validateShoppingCartBadgeCount('2')
    await checkoutAction.navigateToCheckoutPage()
    await checkoutAction.validateCheckoutItem(
      checkoutData.checkoutItemJacketTitle
    )
    await checkoutAction.validateCheckoutItem(
      checkoutData.checkoutItemOnesieTitle
    )
    await checkoutAction.confirmCheckout()
    await checkoutAction.cancelCheckout()
  })

  test.afterEach(async ({ page }) => {
    const homePage = new HomePage(page)
    const homeActions = new HomeActions(homePage)
    await homeActions.logout()
  })
})
