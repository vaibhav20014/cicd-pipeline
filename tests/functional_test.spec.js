// Importing Playwright from local node_modules
const { test, expect } = require('@playwright/test'); // Ensure Playwright is installed in node_modules

test.describe('User Authentication', () => {
    // Test for successful sign-in
    test('should sign in successfully and navigate to the next page', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://103.251.252.106:31823/login'); // Replace with your login URL

        // Wait for the email field to appear
        await page.waitForSelector('#email', { timeout: 50000 });  // Increased timeout

        // Fill in the login form
        await page.fill('#email', 'testuser@example.com'); // Replace with the actual selector for email
        await page.fill('#password', 'password123'); // Replace with the actual selector for password
        await page.click('#signInButton'); // Replace with the actual selector for the sign-in button

        // Check if the next page loads (for example, wait for dashboard to appear)
        await expect(page).toHaveURL('http://103.251.252.106:31823/dashboard');  // Adjust with correct URL
    });
});
