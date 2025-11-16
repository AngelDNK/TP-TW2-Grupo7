import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export const AuthController = {

  signin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.signin(email, password);

    if (!result) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({
      message: "Inicio de sesión exitoso",
      token: result.token,
      user: result.user
    });
  },

  signup: async (req: Request, res: Response) => {
    const nuevo = await AuthService.signup(req.body);

    if (!nuevo) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  },

  recuperar: async (req: Request, res: Response) => {
    const { email } = req.body;
    const token = await AuthService.generarTokenRecuperacion(email);

    if (!token) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    res.json({ message: "Correo enviado" });
  },

  resetPassword: async (req: Request, res: Response) => {
    const { token, nuevaPassword } = req.body;

    const ok = await AuthService.resetPassword(token, nuevaPassword);

    if (!ok) {
      return res.status(400).json({ message: "Token inválido o usuario no encontrado" });
    }

    res.json({ message: "Contraseña restablecida exitosamente" });
  }
};