import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'
const PORT = config.port || 5000
let server: Server

const main = async () => {
  try {
    await mongoose.connect(config.mongo_db_url as string)
    server = app.listen(PORT, () => {
      console.log(`Blog server is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('unhandledRejection', () => {
  console.log('Server closed due to unhandledRejection')
  server.close(() => {
    process.exit(1)
  })
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log('Server closed due to uncaughtException')
  process.exit(1)
})