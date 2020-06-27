const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('../config/config.json');
const cookies = require('../config/cookies.json');


//Function to login to Facebook
const loginFacebook =  async () => {

  //Start the puppeteer and browser
  let browser = await puppeteer.launch({ headless: false })
  let page = await browser.newPage()

  if (Object.keys(cookies).length) {

    //Set the saved cookies in the saved puppeteer browser page
    await page.setCookie(...cookies)

    //Go to facebook
    await page.goto('https://www.facebook.com', { waitUntil: 'networkidle2' })

    //Return the page
    return page

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

    //Check if logged in
    try {
      await page.waitFor('[data-click = "profile_icon"]')
    } catch (error) {
      console.log("Failed to log in")
      process.exit(0)
    }

    //Get the present cookies information
    let currentCookies = await page.cookies('https://www.facebook.com/login')

    //Save the cookies in a seperate file
    fs.writeFileSync('./cookies.json', JSON.stringify(currentCookies))

    //Return the page
    return page
  }
}


module.exports = loginFacebook