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