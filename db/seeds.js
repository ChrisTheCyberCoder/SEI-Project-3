import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDb.js'
import Item from '../models/item.js'
import User from '../models/user.js'
import itemData from './data/items.js'
import userData from './data/users.js'
import commentSchema from '../models/item.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')

    const usersWithBasket = userData.map(user => {
      user.basket = []
      user.purchased = []
      // more stuff to be added later. 
      return user
    })

    const users = await User.create(usersWithBasket)

    console.log(`🤖 ${users.length} users created`)
    // console.log(usersWithBasket)

    // add basket to the user schema 

    // const randomNumberGen = Math.floor(Math.random() * 3)

    
    
    const itemsWithComments = itemData.map(item => {
      const randomNumberGen = Math.floor(Math.random() * 3)

      // function commentGen() {

      //   if (randomNumberGen === 0 ) {
      //   return 'good'
      //   } else if (randomNumberGen === 1) {
      //   return 'bad'
      //   } else if (randomNumberGen === 2) {
      //   return 'awful!'
      //   }
      // }

      item.comments = [commentSchema]
      return item 
    })


    const items = await Item.create(itemsWithComments)

    console.log(`🤖 ${items.length} items created`)

    console.log(itemsWithComments)

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
