import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app:Application = express()
import httpStatus from 'http-status'

app.use(express.json())
app.use(cors())

app.get('/', (req:Request, res: Response) => {
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Server is running successfully'
    })
})

export default app