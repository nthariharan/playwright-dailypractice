const { customTest } = require('../fixtures/createOrder');


customTest("Get Login Token @TOKEN", async ({ token, orderId }) => {
    console.log("Token =>", token);
    console.log ("OrderId =>" , orderId);
    
});