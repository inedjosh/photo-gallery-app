import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import getErrorMessagesFromArray from '../../helpers/getErrorMessagesFromArray'
import ImageModel from '../../models/Image'
import asyncHandler from '../../utils/asyncHandler'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import {
  deleteOneFactory,
} from '../../utils/factories/factories'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = getErrorMessagesFromArray(errors.array())
      next(sendBadRequestError(errorMessages))
    }

    const { imageId } = req.params
    const { email } = req.body

    if (email !== req.body.user.email)
      return next(
        sendBadRequestError('Could not authenticate user. log in and try again')
      )

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    await deleteOneFactory(ImageModel, {
      _id: imageId,
    })

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'successfully deleted image',
      data: {},
    })
  }
)
