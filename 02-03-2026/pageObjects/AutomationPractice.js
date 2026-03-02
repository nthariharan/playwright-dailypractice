class AutomationPractice {

    /*** @param {import("@playwright/test").Page} page  */
    constructor(page) {
        this.page = page;
        this.endPoint = "https://rahulshettyacademy.com/AutomationPractice/";
        this.userName = "Test"
        this.alertMsg = `Hello ${this.userName}, share this practice page and share your knowledge`;
        this.dialogSection = this.page.getByRole('group', { name: "Switch To Alert Example" });
        this.txtBox_dialogSection = this.dialogSection.getByRole('textbox');
        this.btnAlert_dialogSection = this.dialogSection.getByRole('button', { name: /alert/i });
    }
}

module.exports = AutomationPractice;