import { test, expect } from '@playwright/test';
const credentials = require('../test-data/credentials.json');
const SignInPage = require('../pages/signInPage.js');
const HomePage = require('../pages/homePage.js');
const QAProjectPage = require('../pages/qaProjectPage.js');

test.describe('brains app', () => {
    test.beforeEach(async ({ page }) => {
        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);

        await signInPage.gotoSignInPage();
        await signInPage.signInToBrainsApp(credentials.emailAddress, credentials.password);
        await expect(page).toHaveURL('https://qa-test.intellisense.io/next/home');
        await expect(page.getByRole('link', { name: 'QA Automation test Project' })).toBeVisible();
        await homePage.clickOnQAProject();
    });

    test('validate tooltip timestamp', async ({ page }) => {
        const qaProjectPage = new QAProjectPage(page);

        await qaProjectPage.clickOnCursorPoint();
        const toolTip = await qaProjectPage.toolTip.innerText();
        const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        expect(timestampRegex.test(toolTip)).toBe(true);
    });

    test('validate PDF download report', async ({ page, browserName, headless }) => {
        const qaProjectPage = new QAProjectPage(page);

        await qaProjectPage.clickOnActionToggleButton();
        await qaProjectPage.clickOnDownloadButton();

        if (browserName === 'chromium' && headless === true) {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                page.locator('//a[text()="Download"]').click()
            ]);
            const endsWithPdf = download.suggestedFilename().endsWith('.pdf');
            expect(endsWithPdf).toBe(true);
        }
        else if ((browserName === 'chromium' && headless === false) || browserName === 'firefox' || browserName === 'webkit') {
            const [reportPage] = await Promise.all([
                page.waitForEvent('popup'),
                page.locator('//a[text()="Download"]').click()
            ])
            reportPage.on('response', response =>
                expect(response.headers()['content-type']).toBe('application/pdf')
            );
            await reportPage.waitForURL(pdfUrl);
            const reportPageUrl = reportPage.url();
            await expect(reportPageUrl).toContain('https://qa-test.intellisense.io/file/reports');
        }
    });
});


test('mock an API response', async ({ page, context }) => {
    const apiUrl = 'https://qa-test.intellisense.io/grafana/api/datasources/proxy/uid/fb1c5be8-a9e4-4a48-a325-97dcdb3ae8df//api/data-provider-query/1/REFERENCIA/data'
    await context.route(apiUrl, async (route, request) => {
        const response = await route.fetch();
        let body = await response.text();
        body = body.replace("Energy", "Mock ");
        await route.fulfill({
            response,
            body,
            headers: {
                ...response.headers(),
                'content-length': String(Buffer.byteLength(body)),
            },
        });
    });
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);

    await signInPage.gotoSignInPage();
    await signInPage.signInToBrainsApp(credentials.emailAddress, credentials.password);
    await expect(page).toHaveURL('https://qa-test.intellisense.io/next/home');
    await expect(page.getByRole('link', { name: 'QA Automation test Project' })).toBeVisible();
    await homePage.clickOnQAProject();
    await expect(page.locator('iframe').nth(3).contentFrame().getByText('Mock')).toBeVisible();
});