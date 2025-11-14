import { Sequelize } from "sequelize";

export const db = new Sequelize("tp_taller_web2", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

// Verificamos la conexión al iniciar
export async function conectarDB() {
  try {
    await db.authenticate();
    console.log("✅ Conexión con MySQL establecida correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

// export const db = new Sequelize('tp_taller_web2', 'root', 'Karasuno25.', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

/*ACUERDENSE SI TIENEN CONTRASEÑA en MySQL Workbench, SI NO LES DA ERROR*/
