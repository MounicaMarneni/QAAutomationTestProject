class HomePage {

    constructor(page)
     {
        this.page = page;
        this.qaAutomationTestProject = page.getByRole('link', { name: 'QA Automation test Project' });
     }

    async clickOnQAProject() {
        await this.qaAutomationTestProject.click();
    }
}
module.exports = HomePage;