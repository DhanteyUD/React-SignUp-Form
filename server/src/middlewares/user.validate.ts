import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
const { joiPassword } = require('joi-password');

const schema = Joi.object({
  email: Joi.string().email().min(12).max(50).required(),
  fullname: Joi.string().min(3).max(200).required(),
  mobile: Joi.string().max(15).required(),
  password: joiPassword
    .string()
    .min(8)
    .max(100)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .messages({
      'string.min': 'Minimum of 8 characters',
      'string.max': 'Maximum of 100 characters',
      'password.minOfUppercase': 'At least {#min} uppercase character',
      'password.minOfSpecialCharacters': 'At least {#min} special character',
      'password.minOfLowercase': 'At least {#min} lowercase character',
      'password.minOfNumeric': 'At least {#min} numeric character',
      'password.noWhiteSpaces': '{#label} should not contain white spaces',
    })
    .required(),
});

const userValidate = (req: Request, res: Response, next: NextFunction) => {
  schema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err: { message: any }) => {
      res.status(403).send(err.message);
    });
};

export default userValidate;
