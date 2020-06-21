
const makeBirthdayWishes = async (page) => {

  await page.reload()

  //Click the notifications icon
  await page.click('div[.uiToggle] a[.jewelButton]');


  try {
    //Wait for the post form
    await page.waitFor('.32hm')
  } catch (error) {
    console.log("Failed to load notifications")
    process.exit(0)
  }

  // //Type the post information
  // await page.click('._1mf._1mj')
  // await page.type("._1mf._1mj", postContent, { delay: 10 })

  // //Click the submit form
  // await page.waitFor(1000)
  // await page.click('div[aria-label="Create a post"] button[type=submit]');


  //if we close too soon, it might not finish the post sucessfully
  // await new Promise(res => setTimeout(res, 2000));

  console.log("I am working on notifications checking bro");
}

module.exports = makeBirthdayWishes
