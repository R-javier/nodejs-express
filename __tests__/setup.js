import { config } from "dotenv";
import pool from "../src/config/database.js";

config();

export const mochaHooks = {
  async beforeAll() {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Debes correr tests con NODE_ENV=test");
    }
    console.log("Conectado a DB de test");
  },
  async afterAll() {
    await pool.end();
  },
};

export { pool };
