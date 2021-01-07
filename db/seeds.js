import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDb.js'
import Item from '../models/item.js'
import User from '../models/user.js'
import itemData from './data/item.js'
import userData from './data/users.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')

    const users = await User.create(userData)

    console.log(`🤖 ${users.length} users created`)

    const items = await Item.create(itemData)

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
