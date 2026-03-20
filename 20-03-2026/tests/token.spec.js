const {test} = require('../fixtures/GetAuthDetails');

test.describe("Get Auth Details like Token, Order Creation, Authenticated Page via Fixtures", async()=>{
    test("Get Token @AUTH", async({token, orderId})=>{
        console.log("Token =>", token);
        console.log("order Id =>", orderId );
    });
});