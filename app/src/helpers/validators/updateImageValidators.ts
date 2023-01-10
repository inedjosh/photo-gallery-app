import { body } from 'express-validator'

export default [
  body('email').isEmail().withMessage('Please provide a valid email'),
]
