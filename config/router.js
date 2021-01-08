import express from 'express'
import items from '../controllers/items.js'
import auth from '../controllers/auth.js'

const router = express.Router()

router.route('/items')
  .get(items.index)
  .post(items.create)

router.route('/items/:id')
  .get(items.show)
  .put(items.update)
  .delete(items.delete)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

// router.route('/items/:id/comments')
//   .post(secureRoute, items.commentCreate)

export default router