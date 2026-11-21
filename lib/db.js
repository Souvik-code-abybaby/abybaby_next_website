import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const globalForDb = globalThis;

export const sequelize =
  globalForDb.sequelize ??
  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
      pool: { max: 5, min: 0, idle: 10000 },
    }
  );

if (process.env.NODE_ENV !== "production") globalForDb.sequelize = sequelize;