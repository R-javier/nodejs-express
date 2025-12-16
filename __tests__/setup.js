import { config } from "dotenv";
import pool from "../src/config/database.js";

config();

before(async () => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Debes correr tests con NODE_ENV=test");
  }
  console.log("Conectado a DB de test");
});

after(async () => {
  await pool.end();
});

export { pool };
