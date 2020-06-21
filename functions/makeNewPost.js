

const newPost = async (page, postContent) => {

  await page.reload()

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
  await page.type("._1mf._1mj", postContent, { delay: 10 })

  //Click the submit form
  await page.waitFor(1000)
  await page.click('div[aria-label="Create a post"] button[type=submit]');


  //if we close too soon, it might not finish the post sucessfully
  await new Promise(res => setTimeout(res, 2000));

  console.log("I made a new post , bro");
}

module.exports = newPost
