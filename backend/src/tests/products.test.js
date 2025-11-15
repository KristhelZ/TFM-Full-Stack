import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';


const mockProducto = {
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

jest.unstable_mockModule('../models/mysql/index.js', () => ({
  Producto: mockProducto,
}));



const {
  listPublic,
  createProducto,
  updateProducto,
  softDeleteProducto,
} = await import('../controllers/products.controller.js');


function buildApp() {
  const app = express();
  app.use(express.json());
  app.get('/api/products', listPublic);
  app.post('/api/products', createProducto);
  app.put('/api/products/:id', updateProducto);
  app.delete('/api/products/:id', softDeleteProducto);
  return app;
}

describe('Products (controladores simplificados)', () => {
  let app;

  beforeEach(() => {
    app = buildApp();
    jest.clearAllMocks();
  });

  test('GET /api/products -> 200 y array', async () => {
    const fakeRows = [
      { id: 1, name: 'Shortboard', price: 100, stock: 5, active: true },
      { id: 2, name: 'Wetsuit', price: 80, stock: 3, active: true },
    ];
    mockProducto.findAll.mockResolvedValueOnce(fakeRows);

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(mockProducto.findAll).toHaveBeenCalledWith({ where: { active: true } });
  });

  test('POST /api/products (válido) -> 201 y devuelve el producto creado', async () => {
 
    const body = {
      name: 'Test Board',
      brand: 'X',
      description: 'Y',
      price: 100,
      stock: 2,
      image_url: '/img/x.jpg',
      category: 'Surfboards',
    };
    const created = { id: 123, ...body, active: true };
    mockProducto.create.mockResolvedValueOnce(created);

    const res = await request(app).post('/api/products').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 123, name: 'Test Board' });
    expect(mockProducto.create).toHaveBeenCalledTimes(1);
    expect(mockProducto.create).toHaveBeenCalledWith(body);
  });

  test('PUT /api/products/:id con precio/stock negativos -> 422 y no toca DB', async () => {
    const resNegPrice = await request(app)
      .put('/api/products/55')
      .send({ price: -1 });
    expect(resNegPrice.status).toBe(422);
    expect(mockProducto.update).not.toHaveBeenCalled();

    const resNegStock = await request(app)
      .put('/api/products/55')
      .send({ stock: -5 });
    expect(resNegStock.status).toBe(422);
    expect(mockProducto.update).not.toHaveBeenCalled();
  });

  test('DELETE /api/products/:id (soft delete) -> 200 cuando existe; 404 cuando no', async () => {
  
    mockProducto.update.mockResolvedValueOnce([1]);
    const ok = await request(app).delete('/api/products/5');
    expect(ok.status).toBe(200);
    expect(ok.body).toEqual({ deleted: true });
    expect(mockProducto.update).toHaveBeenCalledWith({ active: false }, { where: { id: '5' } });

  
    mockProducto.update.mockResolvedValueOnce([0]);
    const notFound = await request(app).delete('/api/products/9999');
    expect(notFound.status).toBe(404);
  });
});
