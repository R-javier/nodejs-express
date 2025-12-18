import pg from "pg";

const { Pool } = pg;

console.log("PGHOST =", env.PGHOST);

export const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "rrhh",
});

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de Postgres:", err);
});
