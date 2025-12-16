import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import employeesRoutes from "./routes/employees.routes.js";

const app = express();

app.use(express.json());
app.use("/employees", employeesRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler);
export default app;
