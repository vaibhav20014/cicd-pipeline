const { test, expect } = require('@playwright/test');

test.describe('User Authentication', () => {
    // Test for successful sign-up
    test('should sign up successfully', async ({ page }) => {
        // Navigate to the sign-up page
        await page.goto('http://103.251.252.106:31823/'); // Replace with your app URL

        // Fill in the sign-up form
        await page.fill('#username', 'testuser'); // Replace with the actual selector for username
        await page.fill('#email', 'testuser@example.com'); // Replace with the actual selector for email
        await page.fill('#password', 'password123'); // Replace with the actual selector for password
        await page.click('#signUpButton'); // Replace with the actual selector for the sign-up button

        // Assert successful sign-up
        await expect(page.locator('#welcomeMessage')).toContainText('Welcome, testuser!');
    });

    // Test for successful sign-in
    test('should sign in successfully', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://103.251.252.106:31823/login'); // Replace with your login URL

        // Fill in the login form
        await page.fill('#username', 'testuser'); // Replace with the actual selector for username
        await page.fill('#password', 'password123'); // Replace with the actual selector for password
        await page.click('#signInButton'); // Replace with the actual selector for the login button

        // Assert successful login
        await expect(page.locator('#dashboard')).toBeVisible(); // Replace with the actual dashboard selector
    });

    // Test for failed sign-in due to incorrect credentials
    test('should show error on incorrect credentials', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://103.251.252.106:31823/login'); // Replace with your login URL

        // Fill in the login form with incorrect credentials
        await page.fill('#username', 'wronguser'); // Replace with the actual selector for username
        await page.fill('#password', 'wrongpassword'); // Replace with the actual selector for password
        await page.click('#signInButton'); // Replace with the actual selector for the login button

        // Assert error message is shown
        await expect(page.locator('#errorMessage')).toContainText('Invalid username or password'); // Replace with the actual selector for the error message
    });
});
