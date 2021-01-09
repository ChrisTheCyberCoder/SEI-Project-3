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

      item.comments = {
        text: "very good", //need to randomise the comments here using a randome generator // I need to randomise how many comments are posted to each item too. // Create a text database
        rating: 2, // this needs to be randomised too, perhaps according to brands of pokemon. 
        owner: users[randomGen()].id
      }

      //item.comments.push({ text: "awesome", rating: 1, owner: users[randomGen()].id})
      
      
      return item 
    })

    

    const items = await Item.create(itemsWithComments)

    // const pushMoreComments = items.map(item => {
    //   item.comments.push({ text: "awesome", rating: 1, owner: users[randomGen()].id})
    // })

    //push from here. 
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
