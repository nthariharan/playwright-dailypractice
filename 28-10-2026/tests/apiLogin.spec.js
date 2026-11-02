import {test,request} from '@playwright/test';
import { apiUtils } from '../apiUtils/apiUtils';


test("Login with Token from API calls", async()=>{

    const apiContext = await request.newContext();
    const apiUtil = new apiUtils();
    const token = await apiUtil.getToken(apiContext) ;
    console.log("Token from API calls =>",token);

});