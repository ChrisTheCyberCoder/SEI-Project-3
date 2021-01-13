import express from 'express'
import items from '../controllers/items.js'
import users from '../controllers/users.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/users')
  .get(users.userIndex)

router.route('/users/:id') // use this just to help you code, debugging purposes. 
  .get(users.userShow)

router.route('/userprofile') //use this one for profile as it checks they have a token // goes through secure route. 
  .get(secureRoute, users.userProfile)

router.route('/userprofile/:id')
  .put(users.userProfileUpdate)

router.route('/userprofile/:id/basket')
  .put(users.userBasketUpdate) //may need secure route

router.route('/userprofile/:id/:itemdelete') //just added in today (wednesday) // '/userprofile/:id/basket/:itemtodelete' BASKET
  .delete(users.userBasketDelete) //secureroute

router.route('/items')
  .get(items.index)
  .post(items.create)

router.route('/items/:id')
  .get(items.show)
  .put(items.update)
  .delete(items.delete)

router.route('/items/:id/comments')
  .post(secureRoute, items.commentCreate)

router.route('/items/:id/comments/:commentId')
  .delete(secureRoute, items.commentDelete)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)



export default router