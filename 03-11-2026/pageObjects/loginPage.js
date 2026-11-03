class loginPage {

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.baseURL = "https://rahulshettyacademy.com/client/";
        //Locators
        this.txt_email = this.page.getByPlaceholder("email@example.com");
        this.txt_pwd = this.page.getByPlaceholder("enter your passsword");
        this.btn_login = this.page.getByRole("button", { name: "Login" });
    }

    async login(userid,pwd) {
        await this.page.goto(this.baseURL);
        await this.txt_email.fill(userid);
        await this.txt_pwd.fill(pwd);
        await this.btn_login.click();
    }
}

export default loginPage;