import {test,expect} from '@playwright/test'
import loginPage from '../pageObjects/loginPage';
import dashboard from '../pageObjects/dashboard';
import cart from '../pageObjects/cart';
import thankYou from '../pageObjects/thankYou';
import myOrders from '../pageObjects/myOrders';

test("Shopping Cart - 22/10/2026", async({page})=>{

    //Basic vars
    //const baseURL = "https://rahulshettyacademy.com/client/"
    // const userName = process.env.USER_ID;
    // const pwd = process.env.PWD;
    //const tgtProduct = "ZARA COAT 3"
    // const shipCountry =" India"

    //PO Initiation 
    const login_page = new loginPage(page);
    const dashBoard = new dashboard(page);
    const Cart = new cart(page);
    const Thankyou = new thankYou(page);
    const MyOrders = new myOrders(page);
    
   /*  await page.goto(baseURL);
    await login_page.txt_email.fill(userName);
    await login_page.txt_pwd.fill(pwd);
    await login_page.btn_login.click(); */

    await login_page.login(process.env.USER_ID, process.env.PWD);
    await page.waitForURL('**\/dashboard\/dash');
    await dashBoard.selectProduct();

    /* await dashBoard.productCard.last().waitFor();

    const tot_products = await dashBoard.productCard.count();

    console.log(tot_products);
    
    for(let i =0; i<tot_products;i++){
        console.log(await  dashBoard.productCard.nth(i).textContent());
        if (await dashBoard.productCard.nth(i).locator('h5').textContent() === tgtProduct){
            await dashBoard.productCard.nth(i).getByRole("button",{name: " Add To Cart"}).click();
            break;
        }
        
    }
        await dashBoard.menu_cart.click();
 */
    
    await Cart.cartCheckOut();


    /* 
    await Cart.cart_items.first().waitFor();
    console.log(await Cart.cart_items.locator('h3').textContent());
    if (await Cart.cart_items.locator('h3').textContent() === tgtProduct){
        console.log("product matches");
    }
    await Cart.btn_checkout.click();

    await Cart.paymentInfo.waitFor();
    await expect(Cart.paymentUserName).toHaveText(userName);
    await Cart.txtShipCountry.pressSequentially('india');
    await expect(Cart.countrySearchResult).toBeVisible();
    await Cart.countrySearchResult.filter({hasText: shipCountry}).click();
    
    await expect(Cart.btnPlaceOrder).toBeVisible();
    await Cart.btnPlaceOrder.click();
     */
    
    await Thankyou.getOrderID();

    /*
    await expect(Thankyou.txtThankYou).toBeVisible();

    
    let OrderId = (await Thankyou.txtOrder.textContent()).split('|')[1];
    OrderId = OrderId.trim();
    console.log(OrderId);

    */
    

    await Thankyou.myOrders.click();

    await MyOrders.viewMyOrder();
    /*
    await expect(MyOrders.yourOrders).toBeVisible();

    await MyOrders.orderRows.first().waitFor();
    let orderCount = await MyOrders.orderRows.count();
    console.log("Order count =>",orderCount);
    for(let i=0;i<orderCount ;i++){
        console.log(await MyOrders.orderRows.nth(i).locator('th').textContent());
        if(MyOrders.orderRows.nth(i).getByText(OrderId)){
            console.log("in if loop");
            await MyOrders.orderRows.nth(i).getByRole("button",{name:"View"}).click();
            break;

        }
    }

    
    await expect(MyOrders.txtOrderSummary).toBeVisible();
    */

});