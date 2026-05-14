import jwt from 'jsonwebtoken';

const SECRET = 'SUPER_SECRET_KEY';

export class JwtAdapter {

  static generateToken(payload: object) {
    return jwt.sign(payload, SECRET, {
      expiresIn: '1h'
    });
  }

  static validateToken(token: string) {
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      return null;
    }
  }
}