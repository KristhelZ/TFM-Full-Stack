import Joi from "joi";

const baseFields = {
  name: Joi.string().min(2).max(120).required(),
  address: Joi.string().min(5).max(255).required(),
};

const singleProduct = Joi.object({
  ...baseFields,
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().default(1),
});

const compatItems = Joi.object({
  ...baseFields,
  items: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().default(1),
    })
  ).min(1).required(),
});


export const createOrderSchema = {
  body: Joi.alternatives().try(singleProduct, compatItems),
};
