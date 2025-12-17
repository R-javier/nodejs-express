import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

console.log("PGHOST =", env.PGHOST);

export const pool = new Pool({
  host: env.PGHOST,
  port: env.PGPORT,
  user: env.PGUSER,
  password: env.PGPASSWORD,
  database: env.PGDATABASE,
});
