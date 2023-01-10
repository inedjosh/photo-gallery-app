import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { sendNotFoundError } from './helpers/errors/commonAppErrors'
import { AppError, handleAppError } from './utils/error/AppError'
import v1Routes from './routes/v1'
import { connectDatabase } from './config/database'

const app = express()

// connect DB
connectDatabase()

// Express body parsers
app.use(json({ limit: '50kb' }))
app.use(urlencoded({ extended: false, limit: '50kb' }))

// CORS middleware
app.use(cors())

app.use('/v1', v1Routes)

app.all('*', (req, res, next) => {
  next(sendNotFoundError('Invalid route! 🙄'))
})

// Global error Handling middleware

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  return handleAppError(res, err)
})

export default app
