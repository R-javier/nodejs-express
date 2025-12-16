import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Middleware central
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(port, () => {
  console.log("servidor activo en el puerto", port);
});
