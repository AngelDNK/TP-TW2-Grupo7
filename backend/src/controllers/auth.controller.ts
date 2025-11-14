import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendRecoveryEmail } from '../utils/emailHelper';

// mapa temporal para guardar los tokens generados (email <-> token)
const passwordResetTokens = new Map<string, string>();

export const AuthController = {
  // Iniciar sesión
  signin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      const passwordValida = await bcrypt.compare(password, user.password);
      if (!passwordValida) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          direccion: user.direccion,
          email: user.email,
          rol: user.rol
        }
      });
    } catch (error) {
      console.error('❌ Error en signin:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  // Registrar usuario
  signup: async (req: Request, res: Response) => {
    try {
      const { nombre, apellido, direccion, email, password } = req.body;

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!regex.test(password)) {
        return res.status(400).json({
          message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
        });
      }

      const existente = await User.findOne({ where: { email } });
      if (existente) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const nuevo = await User.create({
        nombre,
        apellido,
        direccion,
        email,
        password: passwordHash,
        rol: 'cliente'
      });

      console.log('✅ Usuario registrado:', nuevo.email);
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('❌ Error en signup:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  // Recuperar contraseña (envía correo real)
  recuperar: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'Correo no encontrado' });
      }

      // Generar token único
      const token = crypto.randomBytes(32).toString('hex');
      passwordResetTokens.set(token, email);

      // Enviar correo real con Nodemailer
      await sendRecoveryEmail(email, token);

      console.log(`📨 Token generado para ${email}: ${token}`);
      res.json({ message: 'Correo de recuperación enviado con éxito' });
    } catch (error) {
      console.error('❌ Error en recuperar:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  // Restablecer contraseña
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token, nuevaPassword } = req.body;

      if (!token || !nuevaPassword) {
        return res.status(400).json({ message: 'Datos incompletos' });
      }

      const email = passwordResetTokens.get(token);
      if (!email) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const hash = await bcrypt.hash(nuevaPassword, 10);
      user.password = hash;
      await user.save();

      // Eliminar token usado
      passwordResetTokens.delete(token);

      console.log(`🔐 Contraseña restablecida para ${email}`);
      res.json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
      console.error('❌ Error en resetPassword:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  }
};