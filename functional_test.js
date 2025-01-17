const { execSync } = require('child_process');

try {
    require('@playwright/test');
} catch (e) {
    console.log('Installing @playwright/test...');
    execSync('npm install @playwright/test && npx playwright install', { stdio: 'inherit' });
}

const { test, expect } = require('@playwright/test');

test.describe('User SignUp and SignIn', () => {
  // Test for successful sign-up
  test('should sign up successfully', async ({ page }) => {
    // Navigate to the sign-up page (URL of your local or hosted app)
    await page.goto('http://103.251.252.106:31823/'); // Update URL if needed

    // Interact with the sign-up form
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.click('#signUpButton'); // Sign Up Button

    // Wait for successful sign-up message (you can adjust the selector for the success message)
    await page.waitForSelector('.signup-success'); // Adjust if needed

    // Verify the success message appears or any redirect happens (adjust this part as per your flow)
    expect(await page.isVisible('.signup-success')).toBe(true);
    console.log('Signup successful!');
  });

  // Test for successful sign-in
  test('should sign in successfully', async ({ page }) => {
    // Navigate to the sign-in page (URL of your local or hosted app)
    await page.goto('http://103.251.252.106:31823/'); // Update URL if needed

    // Interact with the sign-in form
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.click('#signInButton'); // Sign In Button

    // Wait for successful sign-in (or redirection to another page)
    await page.waitForSelector('#testPage'); // Adjust based on what should be visible after login

    // Check if redirected successfully
    expect(await page.url()).toContain('test.html');
    console.log('SignIn successful!');
  });
});
