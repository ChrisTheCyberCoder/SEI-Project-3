import express from 'express'

import logger from './lib/logger.js'
import { port } from './config/environment.js'
import connectToDatabase from './lib/connectToDb.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'

const app = express()

async function startServer() {
  try {
    await connectToDatabase()
    console.log(' Database has connected')

    app.use(express.json())

    app.use(logger)

    app.use('/api', router)

    app.use(errorHandler)

    app.listen(port, () => console.log(`Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}
startServer()
