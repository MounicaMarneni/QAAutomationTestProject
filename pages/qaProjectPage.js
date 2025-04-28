class QAProjectPage {

    constructor(page)
     {
        this.page = page;
        this.graphPoint = page.locator('iframe').nth(3).contentFrame().locator('.u-over').first();
        this.cursorPoint = page.locator('iframe').nth(3).contentFrame().locator('//div[@class="u-cursor-pt"]');
        this.toolTip = page.locator('iframe').nth(3).contentFrame().locator('(//div[@class="css-xfc7jo"])[1]');
        this.actionToggleButton = page.getByTestId('ActionToggleButton').nth(1);
        this.downloadButton = page.getByTestId('AsyncActionDialog-okButton');
     }

    async clickOnCursorPoint() {
        await this.graphPoint.hover(222, 180); // hover on any point on graph
        await this.cursorPoint.click({ force: true });
    }

    async clickOnActionToggleButton() {
        await this.actionToggleButton.click();
    }

    async clickOnDownloadButton() {
        await this.downloadButton.click();
    }

}
module.exports = QAProjectPage;