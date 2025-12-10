import { Pool } from "pg";
 

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "admin",
  password: "password",
  database: "rrhh-db",
});

// Middleware para parsear JSON
app.use(express.json());

app.get("/", async(req, res) => {
  try {
    const data = await pool.query("SELECT * FROM empleados");
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/servicios", (req, res) => {
  res.send("Estas en la pagina de servicios");
});

app.post("/saludo", (req, res) => {
  console.log(req.body);
  const { nombre } = req.body;
  res.json({ mensaje: `Hola, ${nombre}` });

  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre" });
  }

  res.json({ mensaje: `Hola, ${nombre}` });

});



app.listen(port, () => {
  console.log("servidor activo en el puerto", port);
});



