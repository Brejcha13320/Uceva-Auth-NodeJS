import cors from 'cors';
import express from 'express';
import { JwtAdapter } from './adapters/jwt.adapter';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/generateToken', (req, res) => {
  const { userId, role } = req.body;
  const token = JwtAdapter.generateToken({ userId, role });
  res.json({ token });
});

app.post('/validateToken', (req, res) => {
  const { token } = req.body;
  const payload = JwtAdapter.validateToken(token);
  if (!payload) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token'
    });
  }
  res.json({ ok: true, payload });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});