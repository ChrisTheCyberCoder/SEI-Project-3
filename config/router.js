import express from 'express'
import items from '../controllers/items.js'

const router = express.Router()

router.route('/items')
  .get(items.index)
  .post(items.create)

router.route('/items/:id')
  .get(items.show)
  .put(items.update)
  .delete(items.delete)

export default router