import express from 'express'
import items from '../controllers/items.js'
import users from '../controllers/users.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/users')
  .get(users.userIndex)

router.route('/users/:id') 
  .get(users.userShow)

router.route('/userprofile') 
  .get(secureRoute, users.userProfile)

router.route('/userprofile/:id')
  .put(users.userProfileUpdate)

router.route('/userprofile/basket')
  .post(secureRoute, users.addItemToBasket) 

router.route('/userprofile/basket/:itemId')
  .delete(secureRoute, users.removeItemFromBasket)

router.route('/userprofile/basket/update/:itemId')
  .put(secureRoute, users.updateBasket)

router.route('/userprofile/emptybasket')
  .get(secureRoute, users.checkoutAndEmptybasket)

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