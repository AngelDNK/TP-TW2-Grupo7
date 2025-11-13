import { Sequelize } from 'sequelize';

export const db = new Sequelize('tp_taller_web2', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});