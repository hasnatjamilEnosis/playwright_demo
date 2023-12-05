import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { LoginActions } from '../actions/login.action'
import { HomeActions } from '../actions/home.action'
import loginData from '../data/login.data.json'
import checkoutData from '../data/checkout.data.json'
import { HomePage } from '../pages/home.page'
import { CheckoutPage } from '../pages/checkout.page'
import { CheckoutActions } from '../actions/checkout.action'
import {
  objectKeyLengthCalculator,
  objectToArrayIterator,
} from '../util/common.util'

test.describe('Saucelab validation', () => {
  test.beforeEach(async ({ page }) => {
    // login to the application before each tests
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

    // calculate the total number of products to be added to the cart for checkout
    const totalCheckoutProducts = objectKeyLengthCalculator(
      checkoutData.products
    ).toString()
    // iterate over the products items object using the iterator function and scroll to the product, validate the product availability and add the product to cart
    objectToArrayIterator(checkoutData.products, async (value) => {
      await homeActions.scrollToItem(value)
      await homeActions.validateItemAvailability(value)
      await homeActions.addItemToCart(value)
    })
    // validate the number of items in the shopping cart badge
    await homeActions.validateShoppingCartBadgeCount(totalCheckoutProducts)
    // navigate to checkout page
    await checkoutAction.navigateToCheckoutPage()
    // iterate over the product items object using the iterator function and validate the presence of the products in the cart
    objectToArrayIterator(checkoutData.products, async (value) => {
      await checkoutAction.validateCheckoutItem(value)
    })
    // navigate to confirm checkout page
    await checkoutAction.confirmCheckout()
    // cancel the checkout
    await checkoutAction.cancelCheckout()
  })

  test.afterEach(async ({ page }) => {
    // logout from the app after each tests
    const homePage = new HomePage(page)
    const homeActions = new HomeActions(homePage)
    await homeActions.logout()
  })
})
