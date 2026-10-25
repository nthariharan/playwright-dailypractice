import {expect} from '@playwright/test'

class apiUtils {

    async getToken(apiReq) {

        this.apiReq = apiReq;

        const loginEndPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginPayload = { userEmail: "testmail1@test.com", userPassword: "Testmail@123" };

        const loginResponse = await this.apiReq.post(loginEndPoint, {
            data: loginPayload
        });

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        this.token = loginResponseJson.token;
        return this.token;
    }

    async createOrder(){
        
        const orderEndpoint = "https://rahulshettyacademy.com/api/ecom/order/create-order";
            const orderPayLoad = {
                "orders": [
                    {
                        country: "India",
                        productOrderedId: "6960eac0c941646b7a8b3e68"
                    }
                ]
            };
        
            const orderResponse = await this.apiReq.post(orderEndpoint,{
                data: orderPayLoad,
                headers :{
                    "Authorization" : this.token
                }
            });
        
            expect(orderResponse.ok()).toBeTruthy();
            const orderResponseJson = await orderResponse.json();
            //console.log(orderResponseJson);
            expect(orderResponseJson.message).toMatch("Order Placed Successfully");
            this.orderID= orderResponseJson.orders[0];
            return this.orderID;
    }

}

module.exports = {apiUtils};