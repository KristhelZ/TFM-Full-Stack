import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';
import { validate } from '../middleware/validate.js';
import { createProductoSchema, updateProductoSchema } from '../validators/products.schema.js';
import { listPublic, createProducto, updateProducto, softDeleteProducto } from '../controllers/products.controller.js';

const r = Router();

r.get('/', listPublic);                  
r.use(auth(true));                     
r.post('/',   requireRole('admin'), validate(createProductoSchema), createProducto);
r.put('/:id', requireRole('admin'), validate(updateProductoSchema),  updateProducto);
r.delete('/:id', requireRole('admin'), softDeleteProducto);

export default r;

