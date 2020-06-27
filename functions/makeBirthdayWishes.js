const cheerio = require('cheerio')

const makeBirthdayWishes = async (page) => {

  await page.reload()

  await page.goto('https://www.facebook.com/notifications', { waitUntil: 'networkidle2' })

  //Grab the notifications HTML
  await page.waitFor(5000)
  const notificationsHTML = await page.$eval('._44_u > ul', e => e.outerHTML)

  //Pass the notifications HTML to Cheerio selector
  const $ = cheerio.load(notificationsHTML);
  
  const commentMentions = [] 
  const birthdayWishes = []

  $('ul').find('._33c').each((index, element) => {
    const notification = $(element).attr('data-gt')

    //Get the notifications that tag my name
    if(notification.includes('comment_mention')){
      const commentMentionLink = $(element).find('div > div > a').attr('href')
      commentMentions.push(commentMentionLink)
    }

    //Get the rest of notifications
    // else if(notification.includes(''))
    // commentMentions.push(commentMention)
  })

  await page.waitFor(2000)

  if(commentMentions.length) {
    for(const commentMention of commentMentions) {
      console.log(commentMention);
      await page.goto(commentMention, {waitUntil:'networkidle2'})
      await page.waitFor(2000)

      // const tagger = await page.$eval('a[class =_6qw4]', element => element.text)
      
      await page.click('div[aria-label="Write a reply..."]');
      await page.type('div[aria-label="Write a reply...', `Thanks for tagging~!👍😉`)
      await page.keyboard.press('Enter')

    }
  }

  console.log("Those are objects for data types", commentMentions);

}

module.exports = makeBirthdayWishes
