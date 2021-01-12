import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDb.js'
import Item from '../models/item.js'
import User from '../models/user.js'
import itemData from './data/items.js'
import userData from './data/users.js'
// import commentSchema from '../models/item.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')

    const users = await User.create(userData)

    console.log(`🤖 ${users.length} users created`)
    // console.log(usersWithBasket)

    // add users basket in the scehme and set the type to array and required to false. 

    const itemsWithComments = itemData.map(item => {

      function randomGen() {
        return Math.floor(Math.random() * userData.length)
      }  
      const randomCommentQuantityGen = Math.floor(Math.random() * 4)
      const commentDatabase = ['very good', 'bad', 'rubbish', 'awful'] //this needs to be added. 

      function randomRatingGen() {
        const randomGen = Math.floor(Math.random() * 5) 
        return randomGen + 1
      }

      function randomiseComments() {
        const randomGen = Math.floor(Math.random() * commentDatabase.length)
        return commentDatabase[randomGen]
      }

      if (randomCommentQuantityGen === 0) {
          item.comments = [{
            text: (randomiseComments()), 
            rating: randomRatingGen(), 
            owner: users[randomGen()].id
          }]
      } else if (randomCommentQuantityGen === 1) {
          item.comments = [{
            text: (randomiseComments()), 
            rating: randomRatingGen(), 
            owner: users[randomGen()].id
          }]
          item.comments.push({ text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id})
      } else if (randomCommentQuantityGen === 2) {
          item.comments = [{
            text: (randomiseComments()), 
            rating: randomRatingGen(), 
            owner: users[randomGen()].id
        }]
          item.comments.push({ text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id})
      } else if (randomCommentQuantityGen === 3) {
          item.comments = [{
            text: (randomiseComments()), 
            rating: randomRatingGen(), 
            owner: users[randomGen()].id
      }]
          item.comments.push({ text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id}, { text: (randomiseComments()), rating: randomRatingGen(), owner: users[randomGen()].id})
      }
      return item 
    })

    const items = await Item.create(itemsWithComments)

    console.log(itemsWithComments)

    console.log(`🤖 ${items.length} items created`)

    await mongoose.connection.close()

    console.log('🤖 Goodbye')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)

    await mongoose.connection.close()
    console.log('🤖 Goodbye')
  }
}

seedDatabase()
