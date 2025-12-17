import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export const setupDatabase = async () => {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS roles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nombre VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS departamentos (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nombre VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS empleados (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      rol_id UUID REFERENCES roles(id),
      departamento_id UUID REFERENCES departamentos(id)
    );
  `);
};

export const cleanDatabase = async () => {
  await pool.query(`
    TRUNCATE empleados, roles, departamentos RESTART IDENTITY CASCADE
  `);
};
