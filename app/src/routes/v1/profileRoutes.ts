import { Router } from 'express'
import getProfileController from '../../controllers/profile/getProfileController'
import isAuth from '../../middleware/is-auth'

const router = Router()

/** /v1/profile/  */
router.get('/:userId', isAuth, getProfileController)

export default router
