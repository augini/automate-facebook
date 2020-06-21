const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('./config.json');
const cookies = require('./cookies.json');


(async () => {

  //Start the puppeteer and browser
  let browser = await puppeteer.launch({ headless: false })
  let page = await browser.newPage()

  if (Object.keys(cookies).length) {

    //Set the saved cookies in the saved puppeteer browser page
    await page.setCookies(...cookies)

    //Go to facebook
    await page.goto('https://www.facebook.com', { waitUntil: 'networkidle2' })

  } else {

    //Go to facebook login page
    await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle0' })

    //Write in the username and password
    await page.type('#email', config.username, { delay: 10 })
    await page.type('#pass', config.password, { delay: 10 })

    //Click on the login button
    await page.click('#loginbutton')

    //Wait for navigation to finish
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    await page.waitFor(5000)

    //Check if logged in
    try {
      await page.waitFor('[data-click = "profile_icon"]')
    } catch (error) {
      console.log("Failed to log in")
      process.exit(0)
    }

    //Go to the profile page
    await page.click('[data-click = "profile_icon"]')

    try {
       //Wait for the post form
       await page.waitFor('._1mf._1mj')
    } catch (error) {
      console.log("Failed to type")
      process.exit(0)
    }

    //Type the post information
    await page.click('._1mf._1mj')
    await page.type("._1mf._1mj", "This is the third autofdfmated post", {delay: 10})
    console.log("typing the post information");

    //Click the submit form
    await page.waitFor(1000)
    await page.click('div[aria-label="Create a post"] button[type=submit]');

    //if we close too soon, it might not finish the post sucessfully
    await new Promise(res => setTimeout(res, 2000));
    
    //Get the present cookies information
    let currentCookies = await page.cookies()

    //Save the cookies in a seperate file
    fs.writeFileSync('./cookies.json', JSON.stringify(currentCookies))

  }
  debugger
  await browser.close();
})();