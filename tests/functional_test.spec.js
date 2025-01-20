const { test, expect } = require('@playwright/test'); // Ensure Playwright is installed in node_modules

test.describe('User Authentication Tests', () => {

    // Test case 1: Sign in with an existing user
    test('should go to the next page when signing in with an existing user', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://103.251.252.106:31823/'); // Replace with your app URL

        // Wait for the email and password fields to appear
        await page.waitForSelector('#email', { timeout: 50000 });  // Increased timeout
        await page.waitForSelector('#password');

        // Fill in the login form with an existing user
        await page.fill('#email', 'existinguser@example.com'); // Replace with an existing email
        await page.fill('#password', 'password123'); // Replace with the actual password
        await page.click('#loginButton'); // Replace with the actual login button selector

        // Wait for the next page to load
        await page.waitForSelector('#nextPageElement', { timeout: 50000 }); // Replace with a unique selector on the next page
        expect(await page.isVisible('#nextPageElement')).toBe(true);  // Assert that the next page element is visible
    });

    // Test case 2: Sign up with a new user
    test('should show alert box "User registered" when signing up with a new user', async ({ page }) => {
        // Navigate to the sign-up page
        await page.goto('http://103.251.252.106:31823/'); // Replace with your app URL

        // Wait for the email field to appear
        await page.waitForSelector('#email', { timeout: 50000 });  // Increased timeout

        // Fill in the sign-up form with a new email
        await page.fill('#email', 'newuser@example.com'); // Use a new email
        await page.fill('#password', 'password123'); // Replace with the actual password
        await page.click('#signUpButton'); // Replace with the actual sign-up button selector

        // Wait for and assert the alert box message
        const dialogPromise = page.waitForEvent('dialog'); // Wait for dialog event
        const dialog = await dialogPromise;  // Wait for the dialog event to resolve
        expect(dialog.message()).toContain('User registered');  // Assert the alert message
        await dialog.accept();  // Close the alert box
    });

    // Test case 3: Sign up with an existing email
    test('should show alert box "Email already exists" when signing up with an existing email', async ({ page }) => {
        // Navigate to the sign-up page
        await page.goto('http://103.251.252.106:31823/'); // Replace with your app URL

        // Wait for the email field to appear
        await page.waitForSelector('#email', { timeout: 50000 });  // Increased timeout

        // Fill in the sign-up form with an already registered email
        await page.fill('#email', 'existinguser@example.com'); // Use an existing email
        await page.fill('#password', 'password123'); // Replace with the actual password
        await page.click('#signUpButton'); // Replace with the actual sign-up button selector

        // Wait for and assert the alert box message
        const dialogPromise = page.waitForEvent('dialog'); // Wait for dialog event
        const dialog = await dialogPromise;  // Wait for the dialog event to resolve
        expect(dialog.message()).toContain('Email already exists');  // Assert the alert message
        await dialog.accept();  // Close the alert box
    });

});
