const {customTest} = require('../fixtures/authenticatedPage');

customTest('Interpret API Request @INTER', async({token,orderId})=>{
    console.log("**Token ==>", token);
    console.log("**Order ID =>", orderId);

});

