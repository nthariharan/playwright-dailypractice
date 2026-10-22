import {test,expect} from '@playwright/test'


test("Shopping Cart - 22/10/2026", async({page})=>{

    //Basic vars
    const baseURL = "https://rahulshettyacademy.com/client/"
    const userName = "testmail1@test.com"
    const pwd = "Testmail@123"
    const tgtProduct = "ZARA COAT 3"
    const shipCountry =" India"


    //Locators
    const txt_email = page.locator('#userEmail');
    const txt_pwd = page.locator('#userPassword');
    const btn_login = page.locator('#login');
    const productCard = page.locator('div .card');
    const menu_cart = page.locator('[routerlink*=cart]');
    const cart_items = page.locator('li.items');
    const btn_checkout = page.locator('button', {hasText:"Checkout"})
    const paymentInfo = page.locator('.payment__info');
    const paymentShipping = page.locator('.payment__shipping');
    const paymentUserName = paymentShipping.locator('.user__name label');
    const txtShipCountry = paymentShipping.locator('input').nth(1);
    const countrySearchResult = page.locator('.ta-results');
    const btnPlaceOrder = page.locator('a:has-text("Place Order ")');
    const txtThankYou = page.locator('h1');
    const txtOrder = page.locator('label.ng-star-inserted');
    const myOrders= page.locator("li [routerlink*=myorders]");
    const yourOrders= page.locator('h1');
    const orderRows=  page.locator('tbody tr');
    const txtOrderSummary = page.locator('.email-title')

    await page.goto(baseURL);
    await txt_email.fill(userName);
    await txt_pwd.fill(pwd);
    await btn_login.click();
    await page.waitForURL('**\/dashboard\/dash');

    await productCard.last().waitFor();

    const tot_products = await productCard.count();

    console.log(tot_products);
    
    for(let i =0; i<tot_products;i++){
        console.log(await  productCard.nth(i).textContent());
        if (await productCard.nth(i).locator('h5').textContent() === tgtProduct){
            await productCard.nth(i).locator('button',{hasText : " Add To Cart"}).click();
            break;
        }
        
    }

    await menu_cart.click();
    await cart_items.first().waitFor();
    console.log(await cart_items.locator('h3').textContent());
    if (await cart_items.locator('h3').textContent() === tgtProduct){
        console.log("product matches")
    }

    await btn_checkout.click();
    await paymentInfo.waitFor();
    await expect(paymentUserName).toHaveText(userName);
    await txtShipCountry.pressSequentially('india');
    await expect(countrySearchResult).toBeVisible();
    await countrySearchResult.filter({hasText: shipCountry}).click();
    await expect(btnPlaceOrder).toBeVisible();
    await btnPlaceOrder.click();
    await txtThankYou.waitFor();
    await expect(txtThankYou).toHaveText(' Thankyou for the order. ');
    
    let OrderId = (await txtOrder.textContent()).split('|')[1];
    OrderId = OrderId.trim();
    console.log(OrderId);
    
    await myOrders.click();
    await yourOrders.waitFor();
    await expect(yourOrders).toHaveText("Your Orders");
    await orderRows.first().waitFor();
    let orderCount = await orderRows.count();
    console.log("Order count =>",orderCount);
    for(let i=0;i<orderCount ;i++){
        console.log(await orderRows.nth(i).locator('th').textContent());
        if(await orderRows.nth(i).locator('th').textContent() === OrderId){
            console.log("in if loop");
            
            await orderRows.nth(i).locator('button', { hasText: "View" }).click();
            break;
        }
    }

    await txtOrderSummary.waitFor();
    await expect(txtOrderSummary).toHaveText(' order summary ');
    




});