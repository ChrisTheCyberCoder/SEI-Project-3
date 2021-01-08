import express from 'express'

import logger from './lib/logger.js'
import { port } from './config/environment.js'
import connectToDatabase from './lib/connectToDb.js'
import router from './config/router.js'

const app = express()

async function startServer() {
  try {
    await connectToDatabase()
    console.log(' Database has connected')

    app.use(express.json())

    app.use(logger)

    app.use(router)

    //error handler needed here

    app.listen(port, () => console.log(`Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}
startServer()



// // index
// app.get('/items', async (_req, res) => {
//   const items = await Item.find()
//   return res.status(200).json(items)
// })
// // create item
// app.post('/items', async (req, res) => {
//   try {
//     const newItem = await Item.create(req.body)
//     return res.status(201).json(newItem)
//   } catch (err) {
//     console.log(err)
//     return res.status(422).json(err)
//   }
// })
// // show single item 
// app.get('/items/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const item = await Item.findById(id)
//     if (!item) throw new Error() 
//     return res.status(200).json(item)
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ 'message': 'Not Found' })
//   }
// })
// // Edit Item 
// app.put('/items/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const itemToEdit = await Item.findById(id)
//     if (!itemToEdit) throw new Error()
//     await itemToEdit.save()
//     return res.status(202).json(itemToEdit)
//   } catch (err) {
//     console.log(err)
//   }
// })
// // Delete Item 
// app.delete('/items/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const itemToDelete = await Item.findById(id)
//     if (!itemToDelete) throw new Error()
//     await itemToDelete.remove()
//     return res.sendStatus(204)
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ 'message': 'Not Found' })
//   }
// })