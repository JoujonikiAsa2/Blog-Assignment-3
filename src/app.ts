import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app:Application = express()
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'

app.use(express.json())
app.use(cors())
app.use('/api', router)

app.get('/', (req:Request, res: Response) => {
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Server is running successfully'
    })
})

app.use(globalErrorHandler)

export default app