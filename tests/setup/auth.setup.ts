import path from 'path';
import fs from 'fs';
import { test, expect } from '../fixtures/fixtures';

const authSesssionFile = path.resolve(__dirname, '../../playwright/.auth/user.json');

// read and parse login.json file
const loginDataFile = path.resolve(__dirname, '../../playwright/.auth/login.json');
const loginData = JSON.parse(fs.readFileSync(loginDataFile, 'utf-8')) as {
    valid_user: string;
    valid_password: string;
};

// test('User Login', async ({ page }) => {
//     console.log('User:', loginData.valid_user);
//     console.log('Password:', loginData.valid_password);
// });

test('authenticate', async ({ page, loginPage, topBannerPage }) => {
    await page.goto('/login');
    await loginPage.login(process.env.VALID_USER!, process.env.VALID_PASSWORD!);
    await page.waitForLoadState('networkidle');
    await expect(topBannerPage.userWelcomeMessage).toBeVisible();

    await page.context().storageState({ path: authSesssionFile });
})