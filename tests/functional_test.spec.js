const { test, expect } = require('@playwright/test'); // Ensure Playwright is installed in node_modules

test.describe('User Authentication', () => {
    // Test for successful sign-in
    test('should show alert when trying to register an already registered user', async ({ page }) => {
        // Navigate to the sign-up page
        await page.goto('http://103.251.252.106:31823/'); // Replace with your app URL

        // Wait for the email field to appear
        await page.waitForSelector('#email', { timeout: 50000 });  // Increased timeout

        // Fill in the sign-up form with an already registered email
        await page.fill('#email', 'testuser@example.com'); // Use a registered email
        await page.fill('#password', 'password123'); // Replace with the actual selector for password
        await page.click('#signUpButton'); // Replace with the actual selector for the sign-up button

        // Wait for and assert the alert box message
        const dialogPromise = page.waitForEvent('dialog'); // Wait for dialog event
        page.click('#signUpButton'); // Trigger the event (if needed, you can trigger another event here if necessary)
        
        const dialog = await dialogPromise;  // Wait for the dialog event to resolve
        expect(dialog.message()).toContain('User already registered');  // Assert the alert message
        await dialog.accept();  // Close the alert box
    });
});
