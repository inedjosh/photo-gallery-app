import { Router, NextFunction, Request, Response } from 'express'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'
import authRoutes from './authRoutes'
import imageRoutes from './imageRoutes'
import profileRoutes from './profileRoutes'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return sendSuccessApiResponse({
    res,
    statusCode: 200,
    message: 'Welcome to node-express backend API.',
    data: {},
  })
})

/** /v1/auth/ */
router.get('/auth', authRoutes)

/** /v1/image/ */
router.get('/image', imageRoutes)

/** /v1/image/ */
router.get('/profile', profileRoutes)

export default router
