import {test,expect} from "@playwright/test"

test("Event Booking - 24/10/2026", async({page})=>{
    
    //Values
    const baseURL = "https://eventhub.rahulshettyacademy.com/login"
    const email = "testmail1@test.com";
    const pwd = "Testmail@123";
    const configSeats = Math.floor(Math.random()*100)+1;
    console.log("configSeats =>", configSeats);
    const customTitle = `Test Event Title ${configSeats}`;
    //const customTitle = `Test Event Title 26`;
    const customCategory = "Festival";


    //Locators
    const txt_email = page.getByLabel("email");
    const txt_pwd = page.getByLabel("password");
    const btn_signIn = page.getByRole("button",{name : "Sign In" });
    const eventCards = page.locator("#event-card");
    const admin = page.getByRole("button",{name: "Admin"});
    const navBar = page.getByRole("navigation");
    const manageEvents = navBar.getByRole("link",{name: "Manage Events"});
    const menu_Events = page.getByTestId('nav-events');
    const txtNewEvent = page.getByText("+ New Event");
    const eventForm = page.locator("#admin-event-form");
    const eventTitle = page.getByLabel("Title");  
    const eventCategory = page.getByLabel("Category");
    const eventCity = page.getByLabel("City");
    const eventVenue = page.getByLabel("Venue");
    const eventDateTime = page.getByLabel("Event Date & Time");
    const eventPrice = page.getByLabel("Price ($)");
    const eventTotalSeats = page.getByLabel("Total Seats");
    const btnAddEvent = page.getByRole("button", {name: "+ Add Event"});
    const msgEventCreated = page.getByText("Event created!");
    const eventPageTitle = page.getByText("Upcoming Events");

    const myEvent = eventCards.filter({hasText : customTitle});

    
    
    await page.goto(baseURL);
    await txt_email.fill(email);
    await txt_pwd.fill(pwd);
    await btn_signIn.click();

    await expect(eventCards.first()).toBeVisible();
    
    //Create a new Event//
 
    await admin.click();
    await expect(manageEvents).toBeVisible();
    await manageEvents.click();
    await expect(txtNewEvent).toBeVisible();
    await eventForm.waitFor();
    await eventTitle.fill(customTitle);
    await eventCategory.selectOption(customCategory);
    await eventCity.fill("Bangalore");
    await eventVenue.fill("amphi theatre");
    await eventDateTime.fill("2026-10-24T14:00");
    await eventPrice.fill('0.51');

   

    await eventTotalSeats.fill(String(configSeats));
    await btnAddEvent.click();
    await expect(msgEventCreated).toBeVisible();
    await menu_Events.click();
    await expect(eventPageTitle).toBeVisible();
    await expect(eventCards.first()).toBeVisible();
 

    const tempSeats = await myEvent.getByText("seats").textContent();
    const seatsBefore = Number(tempSeats.match(/[0-9]+/)[0]) ;
    console.log("Seats Before =>", seatsBefore);

    //await eventCards.getByText(customTitle).click(); 
    const bookMyEvent = myEvent.getByRole("link",{name:"Book Now"});   
    await bookMyEvent.click();

    
    await page.getByLabel("Full Name").fill("cust1");
    await page.getByLabel("Email").fill("cust1@cust1.com");
    await page.getByLabel("Phone Number").fill("9876543210");
    await page.getByRole("button",{name: "Confirm Booking"}).click();
    await expect(page.getByText("Booking Confirmed!")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log("Booking Ref# =>",bookingRef);

    await menu_Events.click({delay: 500});
    await expect(eventCards.first()).toBeVisible();
    const tempSeatsAfter = await myEvent.getByText("seats").textContent();
    const seatsAfter = Number(tempSeatsAfter.match(/[0-9]+/)[0]) ;
    console.log("Seats After =>", seatsAfter);
    


});
