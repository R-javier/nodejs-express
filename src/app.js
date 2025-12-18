import express from "express";
import morgan from "morgan";
import employeesRouter from "./routes/employees.routes.js";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/employees", employeesRouter);

//// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res
    .status(status)
    .json({ error: err.message || "Error interno del servidor" });
});

const PORT = Number(process.env.PORT || 3000);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
  });
}
