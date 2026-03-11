import { test, expect } from './fixtures/fixtures';
import { addProductsToCart, addProducttoCart } from './pages/products';
import * as cart from './pages/cart';
import * as topBanner from './pages/topBanner';
import * as checkout from './pages/checkout'
import { userCandy, addedProduct } from './test-data/product-checkout'

test.beforeEach(async ({ page }) => {
    await page.goto('/products');
});


// clean up other tests using new page classes

test('add item to cart using POM', async ({ page }) => {
    const addFirstProduct = await addProducttoCart(page, 0);

    topBanner.goToCart(page);

    cart.assertProduct(page, addFirstProduct.name!);

    const subtotal = await cart.getSubtotal(page);
    expect(subtotal).toBe(addFirstProduct.price);

});

test('proceed to checkout', async ({ page }) => {
    const addFirstProduct = await addProducttoCart(page, 1);

    const cartButton = page.locator('[data-test-id="header-cart-button"]').getByRole('button');
    cartButton.click();

    const cartOrderSummary = page.getByText('Order Summary');
    await expect(cartOrderSummary).toBeVisible();

    cart.proceedToCheckout(page);

    await expect(page).toHaveURL('/checkout');
});

test('Product Purchase and Track Order', async ({
    page,
    checkoutPage,
    topBannerPage,
    productsPage,
    cartPage,
    contactPage,
    trackingPage
}) => {
    const addProducts = await productsPage.addProductsToCart(3, 2);

    // for future cases could build an array of products to add
    // to cart and then call them later as necessary for assertions

    await topBannerPage.goToCart();

    cartPage.assertProduct(page, addProducts.name!);
    cartPage.assertProductQuantity(page, addProducts.name!, addProducts.quantity!);
    cartPage.proceedToCheckout();

    await checkoutPage.fillUserInfo(userCandy);
    await checkoutPage.clickPlaceOrder();
    const orderNumber = await checkoutPage.grabOrderNumber();
    await checkoutPage.clickTrackOrder();

    await contactPage.submitTrackOrderForm(orderNumber!, userCandy.emailAddy!);

    await trackingPage.assertUrl(orderNumber!);
    await trackingPage.assertItemsOrdered(0, addProducts.name!, addProducts.quantity!);
});

test('Product Purchase and Track Order - With Steps', async ({
    page,
    checkoutPage,
    topBannerPage,
    productsPage,
    cartPage,
    contactPage,
    trackingPage
}) => {

    let addProducts: addedProduct;

    await test.step('Add products and go to cart', async () => {
        addProducts = await productsPage.addProductsToCart(3, 2);
        await topBannerPage.goToCart();
    });

    await test.step('Assert products in cart and proceed to checkout', async () => {
        cartPage.assertProduct(page, addProducts.name!);
        cartPage.assertProductQuantity(page, addProducts.name!, addProducts.quantity!);
        cartPage.proceedToCheckout();
    });

    await test.step('Fill out checkout form and place order', async () => {
        await checkoutPage.fillUserInfo(userCandy);
        await checkoutPage.clickPlaceOrder();
    });

    await test.step('Grab order number and submit track order form', async () => {
        const orderNumber = await checkoutPage.grabOrderNumber();
        await checkoutPage.clickTrackOrder();

        await contactPage.submitTrackOrderForm(orderNumber!, userCandy.emailAddy!);

        await trackingPage.assertUrl(orderNumber!);
        await trackingPage.assertItemsOrdered(0, addProducts.name!, addProducts.quantity!);
    });
});

