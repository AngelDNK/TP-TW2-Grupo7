import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('📩 Variables cargadas:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'NO DEFINIDA');

export async function sendRecoveryEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const recoveryLink = `${process.env.FRONT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Soporte Grupo 7" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Hacé clic en el siguiente enlace para restablecerla:</p>
      <a href="${recoveryLink}" target="_blank">${recoveryLink}</a>
      <br><br>
      <p>Si no solicitaste este cambio, podés ignorar este correo.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado correctamente a ${email} (ID: ${info.messageId})`);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
}