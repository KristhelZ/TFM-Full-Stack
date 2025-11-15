export const validate = (schema) => (req, res, next) => {
  const payload = ['POST','PUT','PATCH'].includes(req.method) ? req.body : req.query;
  const { error, value } = schema.validate(payload, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: error.details.map(d => ({ path: d.path.join('.'), message: d.message }))
    });
  }
  if (['POST','PUT','PATCH'].includes(req.method)) req.body = value;
  next();
};
