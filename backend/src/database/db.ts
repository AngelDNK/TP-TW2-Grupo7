import { Sequelize } from 'sequelize';

export const db = new Sequelize('tp_taller_web2', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

/*ACUERDENSE SI TIENEN CONTRASEÑA en MySQL Workbench, SI NO LES DA ERROR*/