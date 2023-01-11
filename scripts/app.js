import express from 'express'
import db from './config/db-connect.js'

import { routes } from './routes/index.js'

db.on('error', err => {console.log(`Connection error ${err}`)})
db.once('open', () => console.log('Success to connection on db'))

const app = express()
app.use(express.json())

routes(app)

export default app