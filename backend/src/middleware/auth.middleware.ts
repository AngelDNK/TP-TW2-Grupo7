import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface RequestConUsuario extends Request {
  usuario_id?: number;
}

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const reqConUsuario = req as RequestConUsuario;
  
  const authHeader = reqConUsuario.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET no está definida en .env');
      throw new Error('Error de configuración del servidor');
    }
    
    const payload = jwt.verify(token, jwtSecret) as { id: number, rol: string };
    
    reqConUsuario.usuario_id = payload.id;
    
    next(); 
  } catch (error) {
    console.error('❌ Error al verificar token:', error);
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};