import express, { Application } from 'express'
import cors from 'cors'
const app:Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'
import notFoundError from './app/middlewares/notFoundError'
import httpStatus from 'http-status'

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Server is running successfully'
    });
});
app.use('/api', router)

app.use(globalErrorHandler)
app.use(notFoundError)

export default app