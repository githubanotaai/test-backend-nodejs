import { createConnection } from 'typeorm'

createConnection().then(() =>
  console.log('📦 Sucessfully connected with database')
).catch(err => console.log(err))
