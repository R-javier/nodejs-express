import express from "express";
import { Pool } from "pg";

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "admin",
  password: "password",
  database: "rrhh-db",
});

app.use(express.json());

app.get("/employees", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM empleados");
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/employees/maxrole", async (req, res) => {
  try {
    const maxrole = await pool.query(`SELECT 
    r.id,
    r.nombre,
    COUNT(e.id) AS cantidad_empleados
    FROM roles r
    LEFT JOIN empleados e ON r.id = e.rol_id
    GROUP BY r.id, r.nombre
    ORDER BY cantidad_empleados DESC
    LIMIT 1`);

    res.json(maxrole.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/employees/count/:dept", async (req, res) => {
  const deptId = req.params.dept;
  try {
    const deptCountEmployees = await pool.query(
      "SELECT COUNT(*) FROM empleados WHERE departamento_id = $1",
      [deptId],
    );
    res.json(deptCountEmployees.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/employees/:dept/:role", async (req, res) => {
  const deptId = req.params.dept;
  const roleId = req.params.role;
  try {
    const deptRoleEmployees = await pool.query(
      "SELECT * FROM empleados WHERE departamento_id = $1 AND rol_id= $2",
      [deptId, roleId],
    );
    res.json(deptRoleEmployees.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/employees/:dept", async (req, res) => {
  const deptId = req.params.dept;
  try {
    const deptEmployees = await pool.query(
      "SELECT * FROM empleados WHERE departamento_id = $1",
      [deptId],
    );
    res.json(deptEmployees.rows);
  } catch (error) {
    console.log(error);
  }
});

app.put("/employees/:id/:role", async (req, res) => {
  const employeeId = req.params.id;
  const roleId = req.params.role;
  try {
    const employee = await pool.query("SELECT * FROM empleados WHERE id = $1", [
      employeeId,
    ]);
    await pool.query("UPDATE empleados SET rol_id = $1 WHERE id = $2", [
      roleId,
      employeeId,
    ]);
    const deptmEmployees = await pool.query(
      "SELECT * FROM empleados WHERE departamento_id = $1",
      [employee.rows[0].departamento_id],
    );
    res.json(deptmEmployees.rows);
  } catch (error) {
    console.log(error);
  }
});

//VER antes de crear imagen
app.delete("/employees/:id", async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await pool.query(
      "DELETE FROM empleados WHERE id = $1 RETURNING *",
      [employeeId],
    );

    if (employee.rowCount === 0) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json({
      message: "Empleado eliminado correctamente",
      deleted: employee.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("servidor activo en el puerto", port);
});
