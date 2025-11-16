import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user.repository';
import { sendRecoveryEmail } from '../utils/emailHelper';

const passwordResetTokens = new Map<string, string>();

export class AuthService {

  static async signin(email: string, password: string) {
    const user = await UserRepository.buscarPorEmail(email);
    if (!user) return null;

    const esValida = await bcrypt.compare(password, user.password);
    if (!esValida) return null;

    const jwtSecret = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: user.id, rol: user.rol }, jwtSecret, { expiresIn: '1h' });

    return { user, token };
  }

  static async signup(data: any) {
    const existe = await UserRepository.buscarPorEmail(data.email);
    if (existe) return null;

    const hash = await bcrypt.hash(data.password, 10);

    return await UserRepository.crear({
      ...data,
      password: hash,
      rol: "cliente"
    });
  }

  static async generarTokenRecuperacion(email: string) {
    const usuario = await UserRepository.buscarPorEmail(email);
    if (!usuario) return null;

    const token = crypto.randomBytes(32).toString('hex');
    passwordResetTokens.set(token, email);

    await sendRecoveryEmail(email, token);

    return token;
  }

  static async resetPassword(token: string, nuevaPassword: string) {
    const email = passwordResetTokens.get(token);
    if (!email) return null;

    const user = await UserRepository.buscarPorEmail(email);
    if (!user) return null;

    const hash = await bcrypt.hash(nuevaPassword, 10);
    await UserRepository.actualizarPassword(user.id, hash);

    passwordResetTokens.delete(token);

    return true;
  }
}