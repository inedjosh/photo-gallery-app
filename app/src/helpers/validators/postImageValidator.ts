import { body } from 'express-validator'

export default [
  body('email').isEmail().withMessage('Please provide a valid email'),

  body('image').exists().withMessage('Please provide an image'),

  body('title').exists().withMessage('Confirm provide image title'),

  body('description')
    .exists()
    .withMessage('Please provide image decsription')
    .notEmpty()
    .withMessage('First name field cannot be empty')
    .isString()
    .withMessage('First name shoud be a string'),
]
