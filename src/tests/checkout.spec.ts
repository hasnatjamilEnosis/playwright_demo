import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { LoginActions } from '../actions/login.action'
import { HomeActions } from '../actions/home.action'
import loginData from '../data/login/login.data.json'
import checkoutData from '../data/checkout/checkout.data.json'
import { HomePage } from '../pages/home.page'

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

    await homeActions.validateItemAvailability(
      checkoutData.checkoutItemJacketTitle
    )
    await homeActions.addItemToCart(checkoutData.checkoutItemJacketTitle)
    await homeActions.validateItemAvailability(
      checkoutData.checkoutItemOnesieTitle
    )
    await homeActions.addItemToCart(checkoutData.checkoutItemOnesieTitle)
    await homeActions.validateShoppingCartBadgeCount('2')
    const shoppingCartBtn = page.locator('#shopping_cart_container > a')
    await shoppingCartBtn.click()
    const cartItemsText = await page
      .locator('.inventory_item_name')
      .allTextContents()

    const sortedCartItemsText = cartItemsText.sort()
    const comparisonValues = [
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
    ].sort()
    expect(sortedCartItemsText).toEqual(comparisonValues)
    const checkoutBtn = page.locator('#checkout')
    await checkoutBtn.click()
    const checkoutCancelBtn = page.locator('#cancel')
    await checkoutCancelBtn.click()
  })

  test.afterEach(async ({ page }) => {
    const homePage = new HomePage(page)
    const homeActions = new HomeActions(homePage)
    await homeActions.logout()
  })
})
