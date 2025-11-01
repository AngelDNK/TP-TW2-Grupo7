import { Request, Response } from 'express';
import { users, User } from '../models/user.model';

export const AuthController = {
  signin: (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(`🔹 [POST] /signin — email: ${email}`); // 👈 log en consola

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('✅ Usuario autenticado:', user.email);
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } else {
      console.log('❌ Credenciales incorrectas');
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  },

  signup: (req: Request, res: Response) => {
    const { nombre, email, password } = req.body;
    console.log(`🆕 [POST] /signup — nuevo usuario: ${email}`);

    if (users.find(u => u.email === email)) {
      console.log('⚠️ Usuario ya existente');
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const nuevo: User = {
      id: users.length + 1,
      nombre,
      email,
      password
    };
    users.push(nuevo);

    console.log('✅ Usuario registrado con éxito');
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: nuevo });
  },

  recuperar: (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(`📧 [POST] /recuperar — email: ${email}`);

    const user = users.find(u => u.email === email);

    if (user) {
      console.log('📨 Correo de recuperación enviado a:', email);
      res.status(200).json({ message: 'Se envió un correo para restablecer la contraseña' });
    } else {
      console.log('❌ Correo no encontrado:', email);
      res.status(404).json({ message: 'Correo no encontrado' });
    }
  }
};