import 'reflect-metadata'
import './database/connect'
import { config } from 'dotenv'
import express from 'express'

import productsRoute from './routes/products.routes'; config()

const app = express()

app.use(express.json())

app.use(productsRoute)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server started at http://localhost:${process.env.SERVER_PORT}`)
})
