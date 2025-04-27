import { test, expect } from '@playwright/test';
const credentials = require('../test-data/credentials.json');

// test('brains app sign-in', async ({ page }) => {
//     await page.goto('https://qa-test.intellisense.io/next/signin');
//     await page.getByRole('textbox', { name: 'Email address' }).click();
//     await page.getByRole('textbox', { name: 'Email address' }).fill(credentials.emailAddress);
//     await page.getByRole('textbox', { name: 'Password' }).click();
//     await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
//     await page.getByTestId('SignInLocal-signInButton').click();
//     await expect(page).toHaveURL('https://qa-test.intellisense.io/next/home');
//     await expect(page.getByRole('link', { name: 'QA Automation test Project' })).toBeVisible();
//     await page.getByRole('link', { name: 'QA Automation test Project' }).click();
//     await page.locator('iframe').nth(3).contentFrame().locator('.u-over').first().hover(150,180)
//     await page.locator('iframe').nth(3).contentFrame().locator('//div[@class="u-cursor-pt"]').click({force:true})
//     //div[@class='u-cursor-pt']
//     const toolTip = await page.locator('iframe').nth(3).contentFrame().locator('(//div[@class="css-xfc7jo"])[1]').innerText();
//     console.log('text is-----' + toolTip)
//     const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
//     expect(timestampRegex.test(toolTip)).toBe(true);
// });

// test('download report', async ({ page }) => {
//     await page.goto('https://qa-test.intellisense.io/next/signin');
//     await page.getByRole('textbox', { name: 'Email address' }).click();
//     await page.getByRole('textbox', { name: 'Email address' }).fill(credentials.emailAddress);
//     await page.getByRole('textbox', { name: 'Password' }).click();
//     await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
//     await page.getByTestId('SignInLocal-signInButton').click();
//     await expect(page).toHaveURL('https://qa-test.intellisense.io/next/home');
//     await expect(page.getByRole('link', { name: 'QA Automation test Project' })).toBeVisible();
//     await page.getByRole('link', { name: 'QA Automation test Project' }).click();
//     await page.getByTestId('ActionToggleButton').nth(1).click();
//     await page.getByRole('textbox', { name: 'File Name' }).click();
//     await page.getByTestId('AsyncActionDialog-okButton').click();
    
//     // const [popupPage] = await Promise.all([page.waitForEvent('popup'), page.locator('//a[text()="Download"]').click()]);
//     // if (!popupPage) {
//     //     throw new Error('No popup detected');
//     //   }
      
//     //   await popupPage.waitForTimeout(5000); // not waitForLoadState()
//     //   console.log('new tabbbbbb' + popupPage.url());
//     // await expect(popupPage).toHaveURL('https://qa-test.intellisense.io/file/reports/*');

//     const [download] = await Promise.all([
//         page.waitForEvent('popup'),
//         page.locator('//a[text()="Download"]').click()
//       ]);
      
//       const downloadUrl = download.url();
//       console.log('Download URL:', downloadUrl);

//     await expect(downloadUrl).toContain('https://qa-test.intellisense.io/file/reports');

// });


test('brains app sign-in', async ({ page, context }) => {
    const apiUrl ='https://qa-test.intellisense.io/grafana/api/datasources/proxy/uid/fb1c5be8-a9e4-4a48-a325-97dcdb3ae8df//api/data-provider-query/1/REFERENCIA/data'
    await context.route(apiUrl, async (route, request) => {
        const response = await route.fetch();
        let body = await response.text();
        console.log(body);
        // Modify the body (example: replace "oldValue" with "newValue")
        body = body.replace("Energy", "Mock ");
    
        // Fulfill the route with the modified body
        await route.fulfill({
          response,
          body,
          headers: {
            ...response.headers(),
            'content-length': String(Buffer.byteLength(body)), // update content-length
          },
        });
      });
    await page.goto('https://qa-test.intellisense.io/next/signin');
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill(credentials.emailAddress);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
    await page.getByTestId('SignInLocal-signInButton').click();
    await expect(page).toHaveURL('https://qa-test.intellisense.io/next/home');
    await expect(page.getByRole('link', { name: 'QA Automation test Project' })).toBeVisible();
    await page.getByRole('link', { name: 'QA Automation test Project' }).click();
    await expect(page.locator('iframe').nth(3).contentFrame().getByText('Mock')).toBeVisible()
    
});