import { test, expect } from '@playwright/test';

test.describe('Authentication Page Tests', () => {
    const appUrl = 'http://103.251.252.106:31823/'; // Replace with your local or deployed app URL
    const validUser = { email: 'user@example.com', password: 'password123' };

    test.beforeEach(async ({ page }) => {
        await page.goto(appUrl, { timeout: 60000 }); // Navigate to the app's URL with a 60-second timeout
    });  

    test.describe('UI Element Visibility', () => {
        test('Verify email input field is visible', async ({ page }) => {
            const emailInput = page.locator('#email');
            await expect(emailInput).toBeVisible();
        });

        test('Verify password input field is visible', async ({ page }) => {
            const passwordInput = page.locator('#password');
            await expect(passwordInput).toBeVisible();
        });

        test('Verify Sign In button is visible', async ({ page }) => {
            const signInButton = page.locator('#signInButton');
            await expect(signInButton).toBeVisible();
        });

        test('Verify Sign Up button is visible', async ({ page }) => {
            const signUpButton = page.locator('#signUpButton');
            await expect(signUpButton).toBeVisible();
        });
    });

    test.describe('Authentication Functionality', () => {
        test('Sign In with valid credentials should redirect', async ({ page }) => {
            await page.fill('#email', validUser.email);
            await page.fill('#password', validUser.password);
            await page.click('#signInButton');
            await page.waitForURL('http://103.251.252.106:31823/test.html');
            expect(page.url()).toBe('http://103.251.252.106:31823/test.html');
        });

        test('Sign Up with valid credentials should redirect', async ({ page }) => {
            await page.fill('#email', `newuser_${Date.now()}@example.com`); // Unique email
            await page.fill('#password', validUser.password);
            await page.click('#signUpButton');

            // Wait for navigation
            await page.waitForURL('http://103.251.252.106:31823/test.html');
            expect(page.url()).toBe('http://103.251.252.106:31823/test.html');
        });

        test('Sign In with empty fields should show alert', async ({ page }) => {
            // Spy on alert
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Please fill in all fields.');
                await dialog.dismiss();
            });

            await page.click('#signInButton');
        });

        test('Sign Up with empty fields should show alert', async ({ page }) => {
            // Spy on alert
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Please fill in all fields.');
                await dialog.dismiss();
            });

            await page.click('#signUpButton');
        });

        test('Sign In with incorrect credentials should show error alert', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Sign-In Error: Invalid credentials');
                await dialog.dismiss();
            });

            await page.fill('#email', 'wrong@example.com');
            await page.fill('#password', 'wrongpassword');
            await page.click('#signInButton');
        });

        test('Sign Up with existing email should show alert', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Email already exists');
                await dialog.dismiss();
            });

            await page.fill('#email', validUser.email);
            await page.fill('#password', validUser.password);
            await page.click('#signUpButton');
        });
    });
});
