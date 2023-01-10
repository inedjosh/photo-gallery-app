import { Request, Response, NextFunction } from 'express'
import { sendUserAccountNotAvailableError } from '../../helpers/errors/commonAppAuthErrors'
import { sendBadRequestError } from '../../helpers/errors/commonAppErrors'
import ImageModel from '../../models/Image'
import asyncHandler from '../../utils/asyncHandler'
import findUserByEmail from '../../utils/auth/findUserByEmail'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params
    const page = parseInt(req.params.page)

    if (!email)
      return next(
        sendBadRequestError('Could not authenticate user. log in and try again')
      )

    const user = await findUserByEmail(email)

    if (!user) return next(sendUserAccountNotAvailableError())

    const images = await ImageModel.find({ email: email })

    const totalImage = images.length

    return sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'successfully fetched users images',
      data: {
        images: images,
        imageCount: totalImage,
        pageData: {
          pageNumber: page,
          nextPage: page == Math.floor(totalImage / 5) ? page : page + 1,
          previousPage: page == 1 ? 1 : page - 1,
        },
      },
    })
  }
)
