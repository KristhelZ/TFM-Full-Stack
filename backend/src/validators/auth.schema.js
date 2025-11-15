import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().max(150).required(),
  password: Joi.string().min(3).max(100).required(),
  role: Joi.string().valid('admin','user').default('user')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
});
