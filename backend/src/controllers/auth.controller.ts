import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

export const AuthController = {
  // 🔹 Iniciar sesión
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
          rol: user.rol
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  // 🔹 Registrar usuario
  signup: async (req: Request, res: Response) => {
    console.log("entro pa");

    try {
      const { nombre, apellido, direccion, email, password } = req.body;

      // Validar complejidad mínima (mayúscula, minúscula, número, 8+ caracteres)
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!regex.test(password)) {
        return res.status(400).json({
          message:
            'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
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

      console.log('✅ Usuario cliente registrado:', nuevo.email);
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: nuevo.id,
          nombre: nuevo.nombre,
          apellido: nuevo.apellido,
          rol: nuevo.rol
        }
      });
    } catch (error) {
      console.error('❌ Error en signup:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },

  // 🔹 Recuperar contraseña
  recuperar: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      console.log(`📧 [POST] /recuperar — email: ${email}`);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.log('❌ Correo no encontrado');
        return res.status(404).json({ message: 'Correo no encontrado' });
      }

      console.log('📨 Simulación de envío de correo:', email);
      res.json({ message: 'Correo de recuperación enviado (simulado)' });
    } catch (error) {
      console.error('❌ Error en recuperar:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  }
};
