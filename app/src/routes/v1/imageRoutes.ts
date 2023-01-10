import { Router } from 'express'
import deleteImageController from '../../controllers/images/deleteImageController'
import getAllImagesController from '../../controllers/images/getAllImagesController'
import getUserImageConroller from '../../controllers/images/getUserImageConroller'
import postImageController from '../../controllers/images/postImageController'
import updateImageController from '../../controllers/images/updateImageController'
import postImageValidator from '../../helpers/validators/postImageValidator'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/image/ -> get all images */
router.get('/', getAllImagesController)

/** /v1/image/ -> get a users image */
router.get('/:email', isAuth, getUserImageConroller)

/** /v1/image/ -> post a new image*/
router.post('/', isAuth, postImageValidator, postImageController)

/** /v1/image/ -> update an image*/
router.put('/:imageId', isAuth, updateImageController, updateImageController)

/** /v1/image/ -> delete an image*/
router.delete('/:imageId', isAuth, postImageValidator, deleteImageController)

export default router
