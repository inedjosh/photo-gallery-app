import { Request, Response, NextFunction } from 'express'
import ImageModel from '../../models/Image'
import asyncHandler from '../../utils/asyncHandler'
import sendSuccessApiResponse from '../../utils/response/sendSuccessApiResponse'

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.params.page)

    const totalImage = await ImageModel.countDocuments()

    const images = await ImageModel.find().sort({ createdAt: -1 }).limit(5)

    sendSuccessApiResponse({
      res,
      statusCode: 200,
      message: 'Successfully fetched images',
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
