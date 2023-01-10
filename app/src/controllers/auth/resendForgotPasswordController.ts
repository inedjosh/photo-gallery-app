import { NextFunction, Request, Response } from 'express'
import {
  sendProvideEmailError,
  sendRequestCouldNotBeCompletedError,
  sendUserAccountNotAvailableError,
} from '../../helpers/errors/commonAppAuthErrors'
import asyncHandler from '../../utils/asyncHandler'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    if (!email) next(sendProvideEmailError())

    const user = await findUserByEmail(email)

    if (!user) next(sendUserAccountNotAvailableError())

    // generate otp
    const otp = user.generateOtp()

    if (!(await user.save())) next(sendRequestCouldNotBeCompletedError())

    // send success response
    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully sent otp to users email',
      data: {},
    })
  }
)
