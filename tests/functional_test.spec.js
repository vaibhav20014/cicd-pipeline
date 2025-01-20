// Importing Playwright from local node_modules
const { test, expect } = require('@playwright/test'); // Ensure Playwright is installed in node_modules

test.describe('User Authentication', () => {
    // Test for successful sign-up
    test('should sign up successfully and navigate to the next page', async ({ page }) => {
        // Navigate to the sign-up page
        await page.goto('http://103.251.252.106:31823/'); // Replace with your app URL

        // Fill in the sign-up form
        await page.fill('#email', 'testuser@example.com'); // Replace with the actual selector for email
        await page.fill('#password', 'password123'); // Replace with the actual selector for password
        await page.click('#signUpButton'); // Replace with the actual selector for the sign-up button

        // Wait for navigation to the next page and assert the URL
        await page.waitForURL('http://103.251.252.106:31823/test.html', { timeout: 10000 });
        expect(page.url()).toBe('http://103.251.252.106:31823/test.html');
    });

    // Test for successful sign-in
    test('should sign in successfully and navigate to the next page', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://103.251.252.106:31823/login'); // Replace with your login URL

        // Fill in the login form
        await page.fill('#email', 'himnish@gmail.com'); // Replace with the actual selector for email
        await page.fill('#password', '123'); // Replace with the actual selector for password
        await page.click('#signInButton'); // Replace with the actual selector for the sign-in button

        // Wait for navigation to the next page and assert the URL
        await page.waitForURL('http://103.251.252.106:31823/test.html', { timeout: 10000 });
        expect(page.url()).toBe('http://103.251.252.106:31823/test.html');
    });

    // Test for failed sign-in due to incorrect credentials
    test('should show error on incorrect credentials', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://103.251.252.106:31823/login'); // Replace with your login URL

        // Fill in the login form with incorrect credentials
        await page.fill('#email', 'wronguser@example.com'); // Replace with the actual selector for email
        await page.fill('#password', 'wrongpassword'); // Replace with the actual selector for password
        await page.click('#signInButton'); // Replace with the actual selector for the sign-in button

        // Assert error message is shown (modify selector if necessary)
        const errorMessage = await page.locator('#errorMessage'); // Replace with actual error message locator
        await expect(errorMessage).toContainText('Invalid username or password');
    });
});
