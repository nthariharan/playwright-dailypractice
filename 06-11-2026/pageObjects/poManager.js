import loginPage from './loginPage';
import dashboard from './dashboard';
import cart from './cart';
import thankYou from './thankYou';
import myOrders from './myOrders';

class poManager {
    constructor(page) {
        this.page = page;

        //PO Initiation 
        this.login_page = new loginPage(this.page);
        this.dashBoard = new dashboard(this.page);
        this.Cart = new cart(this.page);
        this.Thankyou = new thankYou(this.page);
        this.MyOrders = new myOrders(this.page);

        //Test context
        // this.tgtProduct = "ZARA COAT 3";
        // this.shipCountry =" India";
        // this.baseURL = "https://rahulshettyacademy.com/client/";
        
    }
}

export default poManager;