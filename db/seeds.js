import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDb.js'
import Item from '../models/item.js'
import User from '../models/user.js'
import itemData from './data/items.js'   
import userData from './data/users.js'
// import commentSchema from '../models/item.js'

import goodCommentDatabase from './data/goodData.js'
import badCommentDatabase from './data/badData.js'
import neutralCommentDatabase from './data/neutralData.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')

    const users = await User.create(userData)

    console.log(`🤖 ${users.length} users created`)
  
    const itemsWithComments = itemData.map(item => {

      function randomRatingGen() {
        const randomGen = Math.floor(Math.random() * 5) 
        return randomGen + 1
      }

      function ranNumFromGoodData() {
        return Math.floor(Math.random() * goodCommentDatabase.length)
      }

      function ranNumFromBadData() {
        return Math.floor(Math.random() * badCommentDatabase.length)
      }

      function ranNumFromNeutralData() {
        return Math.floor(Math.random() * neutralCommentDatabase.length)
      }

      function randomGen() {
        return Math.floor(Math.random() * userData.length)
      }

      let rater = randomRatingGen()

      function randomiseNeutralComments() {
        
        return neutralCommentDatabase[ranNumFromNeutralData()]
      }

      function randomiseBadComments() {
        
        return badCommentDatabase[ranNumFromBadData()]
      }

      function randomiseGoodComments() {

        return goodCommentDatabase[ranNumFromGoodData()]
      }

      const randomCommentQuantityGen = Math.floor(Math.random() * 4)

        // if rating 3 && Changing Quantities
      
        if (rater === 3 && randomCommentQuantityGen === 0) { 
          

          item.comments = [{
            text: randomiseNeutralComments(), 
            rating: rater, 
            owner: users[randomGen()].id
          }]
          
        } else if (rater === 3 && randomCommentQuantityGen === 1) {
          

          item.comments = [{
            text: randomiseNeutralComments(), 
            rating: 2, 
            owner: users[randomGen()].id
          }]

          item.comments.push({
            text: randomiseNeutralComments(),
            rating: rater,
            owner: users[randomGen()].id
          })
        } else if (rater === 3 && randomCommentQuantityGen === 2) {
          

          item.comments = [{
            text: randomiseNeutralComments(), 
            rating: 2, 
            owner: users[randomGen()].id
          }]

          item.comments.push({
            text: randomiseNeutralComments(),
            rating: rater,
            owner: users[randomGen()].id
          }, {
            text: randomiseNeutralComments(),
            rating: 2,
            owner: users[randomGen()].id
          })

        } else if (rater === 3 && randomCommentQuantityGen === 3) {
          

          item.comments = [{
            text: randomiseNeutralComments(), 
            rating: rater, 
            owner: users[randomGen()].id
          }]

          item.comments.push({
            text: randomiseNeutralComments(),
            rating: rater,
            owner: users[randomGen()].id
          }, {
            text: randomiseNeutralComments(),
            rating: 2,
            owner: users[randomGen()].id
          }, {
            text: randomiseNeutralComments(),
            rating: 2,
            owner: users[randomGen()].id
          })
        }
        
      

      // if rating below 2 && Changing Quantities

      if (rater <= 2 && randomCommentQuantityGen === 0) { 
        

        item.comments = [{
          text: randomiseBadComments(), 
          rating: rater, 
          owner: users[randomGen()].id
        }]
        
      } else if (rater <= 2 && randomCommentQuantityGen === 1) {
        

        item.comments = [{
          text: randomiseBadComments(), 
          rating: 1, 
          owner: users[randomGen()].id
        }]

        item.comments.push({
          text: randomiseBadComments(),
          rating: rater,
          owner: users[randomGen()].id
        })
      } else if (rater <= 2 && randomCommentQuantityGen === 2) {
        

        item.comments = [{
          text: randomiseBadComments(), 
          rating: 1, 
          owner: users[randomGen()].id
        }]

        item.comments.push({
          text: randomiseBadComments(),
          rating: rater,
          owner: users[randomGen()].id
        }, {
          text: randomiseBadComments(),
          rating: 1,
          owner: users[randomGen()].id
        })

      } else if (rater <= 2 && randomCommentQuantityGen === 3) {
        

        item.comments = [{
          text: randomiseBadComments(), 
          rating: rater, 
          owner: users[randomGen()].id
        }]

        item.comments.push({
          text: randomiseBadComments(),
          rating: rater,
          owner: users[randomGen()].id
        }, {
          text: randomiseBadComments(),
          rating: 1,
          owner: users[randomGen()].id
        }, {
          text: randomiseBadComments(),
          rating: 1,
          owner: users[randomGen()].id
        })
      }
      

    // if rating more than 3 && Changing Quantities

    if (rater > 3 && randomCommentQuantityGen === 0) { 
      

      item.comments = [{
        text: randomiseGoodComments(), 
        rating: rater, 
        owner: users[randomGen()].id
      }]
      
    } else if (rater > 3 && randomCommentQuantityGen === 1) {
      

      item.comments = [{
        text: randomiseGoodComments(), 
        rating: rater, 
        owner: users[randomGen()].id
      }]

      item.comments.push({
        text: randomiseGoodComments(),
        rating: 5,
        owner: users[randomGen()].id
      })
    } else if (rater > 3 && randomCommentQuantityGen === 2) {
      

      item.comments = [{
        text: randomiseGoodComments(), 
        rating: rater, 
        owner: users[randomGen()].id
      }]

      item.comments.push({
        text: randomiseGoodComments(),
        rating: 4,
        owner: users[randomGen()].id
      }, {
        text: randomiseGoodComments(),
        rating: 5,
        owner: users[randomGen()].id
      })

    } else if (rater > 3 && randomCommentQuantityGen === 3) {
      

      item.comments = [{
        text: randomiseGoodComments(), 
        rating: rater, 
        owner: users[randomGen()].id
      }]

      item.comments.push({
        text: randomiseGoodComments(),
        rating: 4,
        owner: users[randomGen()].id
      }, {
        text: randomiseGoodComments(),
        rating: rater,
        owner: users[randomGen()].id
      }, {
        text: randomiseGoodComments(),
        rating: 4,
        owner: users[randomGen()].id
      })
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
