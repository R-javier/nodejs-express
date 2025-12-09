
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mi respuesta desde express che");
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


