import { expect } from "@playwright/test";

class apiUtils {

    /** @param {import("@playwright/test").APIRequestContext} apiContext  */
    async getToken(apiContext) {
        this.apiContext = apiContext;
        const loginURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginPayload = {
            "userEmail": "newtest123@test.com",
            "userPassword": "Testid@123$"
        };

        const loginResponse = await this.apiContext.post(loginURL,{
            data : loginPayload
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson);

        return loginResponseJson.token;

    }

}

module.exports = { apiUtils };