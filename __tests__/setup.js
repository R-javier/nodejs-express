import { config } from "dotenv";

config(); 

if (process.env.NODE_ENV !== "test") {
  throw new Error("🚨 Debes correr los tests con NODE_ENV=test");
}

console.log("🧪 Entorno de test cargado");
