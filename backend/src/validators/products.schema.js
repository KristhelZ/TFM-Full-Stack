import Joi from 'joi';

export const createProductoSchema = Joi.object({
  name: Joi.string().max(120).required(),
  brand: Joi.string().max(120).allow(null,''),
  category: Joi.string().max(120).allow(null,''),
  description: Joi.string().max(1000).allow(null,''),
  price: Joi.number().precision(2).min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  image_url: Joi.string().uri({ allowRelative: true }).allow(null,''),
  active: Joi.boolean().default(true)
});

export const updateProductoSchema = createProductoSchema.min(1);


