import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login/login.page'
import { LoginActions } from '../actions/login/login.action'
import { HomeActions } from '../actions/home/home.action'
import loginData from '../data/login/login.data.json'
import { HomePage } from '../pages/home/home.page'

test.describe('Saucelab validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    const loginActions = new LoginActions(loginPage)
    await loginActions.navigateToSite()
    await loginActions.login(loginData.username, loginData.password)
  })

  test('validate the shopping cart functionality', async ({ page }) => {
    const productList = await page
      .locator('.inventory_item_name ')
      .allTextContents()
    expect(
      productList,
      'Product list contains Sauce Labs Fleece Jacket'
    ).toContain('Sauce Labs Fleece Jacket')
    const checkoutItem1AddToCartBtn = page.locator(
      '#add-to-cart-sauce-labs-fleece-jacket'
    )
    await checkoutItem1AddToCartBtn.click()
    expect(productList, 'Product list contains Sauce Labs Onesie').toContain(
      'Sauce Labs Onesie'
    )
    const checkoutItem2AddToCartBtn = page.locator(
      '#add-to-cart-sauce-labs-onesie'
    )
    await checkoutItem2AddToCartBtn.click()
    const shoppingCartBadge = page.locator(
      '#shopping_cart_container > a > span'
    )
    await expect(shoppingCartBadge).toHaveText('2')
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
