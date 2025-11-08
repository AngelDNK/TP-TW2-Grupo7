import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('tp_taller_web2', 'root', 'agusscuchi', {
  host: 'localhost',
  dialect: 'mysql'
});

// Verificamos la conexión al iniciar
export async function conectarDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con MySQL establecida correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}
