require("dotenv").config();

const pool = require("../src/config/database");

beforeAll(async () => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Debes correr tests con NODE_ENV=test");
  }
  console.log("✅ Conectado a DB de test");
});

afterAll(async () => {
  await pool.end();
});

global.db = pool;
