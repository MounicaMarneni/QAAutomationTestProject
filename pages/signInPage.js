class SignInPage {

    constructor(page)
    {
        this.page = page;
        this.email = page.getByRole('textbox', { name: 'Email address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.signIn = page.getByTestId('SignInLocal-signInButton');        
    }

    async gotoSignInPage() {
        await this.page.goto('https://qa-test.intellisense.io/next/signin');
    }

    async signInToBrainsApp(email, password) {
        await this.email.click();
        await this.email.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.signIn.click();
    }
}
module.exports = SignInPage;