import cors from 'cors';
import express from 'express';
import { JwtAdapter } from './adapters/jwt.adapter';
import { hash } from 'bcryptjs';
import { bcryptAdapter } from './adapters/bcrypt.adapter';

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
  testBycript();
});

function testBycript(){
  const passwordTest1 = 'abc123';
  const passwordTest2 = 'abc123';
  const hashPasswordTest1 = bcryptAdapter.hash(passwordTest1);
  const hashPasswordTest2 = bcryptAdapter.hash(passwordTest2);

  const test = {
    password1: passwordTest1,
    password2: passwordTest2,
    password1Hash: hashPasswordTest1,
    password2Hash: hashPasswordTest2,
    password1Compare: bcryptAdapter.compare(passwordTest1, hashPasswordTest1),
    password2Compare: bcryptAdapter.compare(passwordTest2, hashPasswordTest2),
  }
  console.log('\nTest - Misma Password pero diferentes Hash', test);
}