//Import the required functions
const loginFacebook = require('./functions/facebookLogin.js');
const newPost = require('./functions/makeNewPost.js');
const makeBirthdayWishes = require('./functions/makeBirthdayWishes.js');

const init = async () => {
  
  const page = await loginFacebook()

  await newPost(page, 'Just testing.')

  await makeBirthdayWishes(page)

}

init()
