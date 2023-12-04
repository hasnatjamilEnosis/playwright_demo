import { test, expect } from '@playwright/test'

test.describe('Saucelab validation', () => {
  test.beforeEach(async ({ page }) => {
    // login action
    await page.goto('https://www.saucedemo.com')
    const userNameField = page.locator('#user-name')
    await userNameField.fill('standard_user')
    const passwordField = page.locator('#password')
    await passwordField.fill('secret_sauce')
    const loginBtn = page.locator('#login-button')
    await loginBtn.click()
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
    // logout action
    const hamburgerMenu = page.locator('#react-burger-menu-btn')
    await hamburgerMenu.click()
    const logoutBtn = page.locator('#logout_sidebar_link')
    await logoutBtn.click()
  })
})
