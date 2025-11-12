import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Envía un correo electrónico de recuperación de contraseña.
 * @param email - Dirección del usuario destinatario.
 * @param token - Token o enlace único de recuperación.
 */
export async function sendRecoveryEmail(email: string, token: string) {
  // 🔐 Configuración segura usando variables de entorno (.env)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // correo que usás para enviar
      pass: process.env.GMAIL_PASS  // clave de aplicación de Gmail
    }
  });

  // 📬 Enlace de recuperación (ajustá la URL si usás otro puerto o dominio)
  const recoveryLink = `http://localhost:4200/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Soporte TP Taller Web 2 - Grupo 7" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <h2>Restablecer tu contraseña</h2>
      <p>Hola 👋, recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Hacé clic en el siguiente enlace para continuar:</p>
      <a href="${recoveryLink}" target="_blank">${recoveryLink}</a>
      <br><br>
      <p>Si no solicitaste este cambio, podés ignorar este mensaje.</p>
      <p>— Equipo de soporte de TP Taller Web 2 - Grupo 7</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Correo de recuperación enviado a: ${email}`);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
}