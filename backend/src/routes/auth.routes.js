  import { Router } from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { User, Role, PersonalAccessToken } from '../models/mysql/index.js';
  import { validate } from '../middleware/validate.js';
  import { registerSchema, loginSchema, refreshSchema } from '../validators/auth.schema.js';
  
  const r = Router();
  
  r.post('/register', validate(registerSchema), async (req, res) => {
    console.log (req.body);
    try {
      const { name, email, password, role = 'user' } = req.body;
  
      console.log (req.body);
  
      const roleRow = await Role.findOne({ where: { name: role, enable: true } });
      if (!roleRow) return res.status(400).json({ message: 'Rol inexistente o inactivo' });
  
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email ya registrado' });
  
      const hashed = await bcrypt.hash(password, 10);
  
      const user = await User.create({ name, email, password: hashed, role });
      return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (e) {
      return res.status(500).json({ message: 'Error registrando', error: e.message });
    }
  });
  
  
  r.post('/login', validate(loginSchema), async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email }, include: Role });
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  
      let ok = await bcrypt.compare(password, user.password);
  
      if (!ok && user.password === password) {
        const newHash = await bcrypt.hash(password, 10);
        user.password = newHash;
        await user.save();
        ok = true;
      }
      if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });
  
      const payload = { id: user.id, email: user.email, role: user.role };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRES });
  
      await PersonalAccessToken.create({
        tokenable_type: 'User',
        tokenable_id: user.id,
        name: 'refresh',
        token: refreshToken,
        abilities: '["*"]'
      });
  
      return res.json({ accessToken, refreshToken });
    } catch (e) {
      return res.status(500).json({ message: 'Error login', error: e.message });
    }
  });
  
  
  r.post('/refresh', validate(refreshSchema), async (req, res) => {
    const { refreshToken } = req.body;
  
    try {
  
      const stored = await PersonalAccessToken.findOne({
        where: { token: refreshToken, name: 'refresh', tokenable_type: 'User' }
      });
      if (!stored) return res.status(401).json({ message: 'Refresh inválido' });
  
      const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  
      const user = await User.findByPk(id, { include: Role });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      const payload = { id: user.id, email: user.email, role: user.role };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
  
      stored.last_used_at = new Date();
      await stored.save();
  
      return res.json({ accessToken });
    } catch {
      return res.status(401).json({ message: 'Refresh inválido/expirado' });
    }
  });
  
  export default r;
  
  
