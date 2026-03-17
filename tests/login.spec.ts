import { test, expect } from './fixtures/fixtures';
import * as loginData from '../playwright/.auth/login.json'

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('login with valid user - run through user menu', async ({ page, topBannerPage, loginPage }) => {

    await topBannerPage.clickLogin();

    // await loginPage.login('dandy@codedandy.com', 'Dandy12345');
    await loginPage.login(loginData.valid_user, loginData.valid_password);

    await page.waitForLoadState('networkidle');
    const kotter = page.getByText('Login Successful');

    await expect(kotter).toBeVisible();
    await topBannerPage.userLink.click();
    await expect(topBannerPage.userPopup).toContainText('dandy@codedandy.com');
    await topBannerPage.userProfileLink.click();
    await expect(page.getByRole('heading', { name: 'User Details' })).toBeVisible();

    await topBannerPage.userLink.click();
    await topBannerPage.userOrdersLink.click();
    await expect(page.getByRole('heading', { name: 'My Orders' })).toBeVisible();

    await topBannerPage.userLink.click();
    await topBannerPage.userLogoutButton.click();
    await expect(topBannerPage.loginLink).toBeVisible();


})