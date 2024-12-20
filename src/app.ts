import express, { Application } from 'express'
import cors from 'cors'
const app:Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'
import notFoundError from './app/middlewares/notFoundError'

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use('/api', router)

app.use(globalErrorHandler)
app.use(notFoundError)

export default app