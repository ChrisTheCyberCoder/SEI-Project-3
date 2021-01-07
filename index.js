import express from 'express'
import mongoose from 'mongoose'
import logger from './lib/logger.js'

const port = 4000
const dbURI = 'mongodb://localhost/pokezon'

const app = express()

function connectToDatabase() {
  mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
}
// function logger(req, _res, next){
//   console.log(`incoming requests: ${req.method} - ${req.url}`)
//   next()
// }

async function startServer() {
  try {
    await connectToDatabase()

  app.use(express.json())
  
  app.use(logger)
    console.log(' Database has connected')
    app.listen(port, () => console.log(`Up and running on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}

startServer()

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 400 },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
})

// const commentSchema = new mongoose.Schema({
//   text: { type: String, required: true, maxlength: 300 },
//   rating: { type: Number, required: true, min: 1, max: 5 },

//   owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
// }, {
//   timestamps: true,
// })

const Item = mongoose.model('Item', itemSchema)


app.get('/items', async (_req, res) => {
  const items = await Item.find()
  return res.status(200).json(items)
})

app.post('/items', async (req, res) => {
  try {
    const newItem = await Item.create(req.body)
    return res.status(201).json(newItem)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
})