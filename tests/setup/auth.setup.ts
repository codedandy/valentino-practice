import path from 'path';
import fs from 'fs';
import test from '@playwright/test';

// read and parse login.json file
const loginDataFile = path.resolve(__dirname, '../../playwright/.auth/login.json');
const loginData = JSON.parse(fs.readFileSync(loginDataFile, 'utf-8')) as {
    valid_user: string;
    valid_password: string;
};

test('User Login', async ({ page }) => {
    console.log('User:', loginData.valid_user);
    console.log('Password:', loginData.valid_password);
});