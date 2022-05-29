import { NestFactory } from '@nestjs/core'
import bodyParser from 'body-parser'
import { AppModule } from './modules/AppModule'

async function Main() {
  const app = await NestFactory.create(AppModule)
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.enableCors()
  await app.listen(process.env.PORT)
}

Main()
