import { test, expect } from '@playwright/test'

test.describe('Saucelab validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com')
  })

  test('validate the shopping cart functionality', async ({ page }) => {
    const loginLogo = page.locator('.login_logo')
    await expect(loginLogo).toHaveText('Swag Labs')
    const userNameField = page.locator('#user-name')
    await userNameField.fill('standard_user')
    const passwordField = page.locator('#password')
    await passwordField.fill('secret_sauce')
    const loginBtn = page.locator('#login-button')
    await loginBtn.click()
  })
})
