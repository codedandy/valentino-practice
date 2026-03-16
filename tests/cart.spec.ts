import { test, expect } from './fixtures/fixtures';
import { userCandy, addedProduct } from './test-data/product-checkout'

test.beforeEach(async ({ page }) => {
    await page.goto('/products');
});


// clean up other tests using new page classes

test('add item to cart using POM', async ({ page, productsPage, cartPage, topBannerPage }) => {

    let addFirstProduct: addedProduct;

    await test.step('first product on page added', async () => {
        addFirstProduct = await productsPage.addProductsToCart(0, 1);
    });

    await test.step('go to cart and assert product is visible', async () => {
        topBannerPage.goToCart();
        cartPage.assertProduct(page, addFirstProduct.name!);
    });

    await test.step('assert subtotal is correct', async () => {
        const subtotal = await cartPage.getSubtotal(page);
        expect(subtotal).toBe(addFirstProduct.price);
    });

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

