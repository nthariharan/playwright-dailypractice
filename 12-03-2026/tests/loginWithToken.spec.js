const { test, expect  } = require('@playwright/test');
let token;
test.beforeAll(async ({request}) => {
    const tokenEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
    const login_payload = { userEmail: process.env.MAILID, userPassword: process.env.PWD };

    const apiResp = await request.post(tokenEndPoint, {
        data: login_payload
    });

    expect(apiResp.ok()).toBeTruthy();
    const json_apiResp = await apiResp.json();
    token = json_apiResp.token;
    expect(json_apiResp.message).toMatch(/Login Successfull/i);
});


test("Direct Login with Token @DIRECT", async ({ browser }) => {
    console.log("Token =>", token);
});