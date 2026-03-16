const {customTest} = require('../fixtures/authenticatedPage');
const {expect} = require('@playwright/test');


customTest('Interpret API Request @INTER', 
    /*** @param {{authPage : import('@playwright/test').Page , orderId : string}} */
    async({orderId,authPage})=>{
    const navbar = authPage.getByRole('navigation');
    const btnOrders = navbar.getByRole('button',{name:/orders/i});
    const orderTable = authPage.getByRole('row');
    const orderRow = orderTable.filter({hasText : orderId});
    const orderView = orderRow.getByRole('button',{name:/view/i});
    const getOrderEndPoint = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*"  
    const error = authPage.getByText('You are not authorize to view this order');

    /***Listener */
    authPage.route(getOrderEndPoint, async (route,request)=>{
        let origURL = request.url();
        let mockURL = origURL.replace(/.{3}$/,"123");
        route.continue({url : mockURL});
    });


    await authPage.goto("https://rahulshettyacademy.com/client");
    await expect(authPage).toHaveURL(/\/dashboard\/dash$/);
    await expect(navbar).toBeVisible();
    await btnOrders.click();
    await expect(authPage).toHaveURL(/\/dashboard\/myorders$/);
    await expect(orderTable.last()).toBeVisible();
    await orderView.click();
    await expect(error).toBeVisible(); 
});

