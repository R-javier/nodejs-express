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

app.get("/employees", async (req, res, next) => {
  try {
    const data = await pool.query(
      process.env.SQL_EMPLOYEES_ALL || "SELECT * FROM empleados",
    );
    res.json(data.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/employees/maxrole", async (req, res, next) => {
  try {
    const sql =
      process.env.SQL_ROLES_MOST_STAFFED ||
      `
   SELECT 
      r.id,
      r.nombre,
      COUNT(e.id) AS cantidad_empleados
    FROM roles r
    LEFT JOIN empleados e ON r.id = e.rol_id
    GROUP BY r.id, r.nombre
    ORDER BY cantidad_empleados DESC
    LIMIT 1
    `;
    const maxrole = await pool.query(sql);
    res.json(maxrole.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/employees/count/:dept", async (req, res, next) => {
  try {
    const deptId = Number(req.params.dept);
    if (!Number.isInteger(deptId)) {
      return res.status(400).json({ error: "Parámetro 'dept' inválido" });
    }

    const sql =
      process.env.SQL_EMPLOYEES_COUNT_BY_DEPT ||
      "SELECT COUNT(*) FROM empleados WHERE departamento_id = $1";
    const deptCountEmployees = await pool.query(sql, [deptId]);
    res.json(deptCountEmployees.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/employees/:dept/:role", async (req, res, next) => {
  try {
    const deptId = Number(req.params.dept);
    const roleId = Number(req.params.role);

    if (!Number.isInteger(deptId) || !Number.isInteger(roleId)) {
      return res
        .status(400)
        .json({ error: "Parámetros 'dept' o 'role' inválidos" });
    }
    const sql =
      process.env.SQL_EMPLOYEES_BY_DEPT_AND_ROLE ||
      "SELECT * FROM empleados WHERE departamento_id = $1 AND rol_id= $2";
    const deptRoleEmployees = await pool.query(sql, [deptId, roleId]);
    res.json(deptRoleEmployees.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/employees/:dept", async (req, res, next) => {
  try {
    const deptId = Number(req.params.dept);
    if (!Number.isInteger(deptId)) {
      return res.status(400).json({ error: "Parámetro 'dept' inválido" });
    }
    const sql =
      process.env.SQL_EMPLOYEES_BY_DEPT ||
      "SELECT * FROM empleados WHERE departamento_id = $1";
    const deptEmployees = await pool.query(sql, [deptId]);
    res.json(deptEmployees.rows);
  } catch (error) {
    next(error);
  }
});

app.put("/employees/:id/:role", async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);
    const roleId = Number(req.params.role);
    if (!Number.isInteger(employeeId) || !Number.isInteger(roleId)) {
      return res
        .status(400)
        .json({ error: "Parámetros 'id' o 'role' inválidos" });
    }

    const getSql =
      process.env.SQL_EMPLOYEE_BY_ID || "SELECT * FROM empleados WHERE id = $1";

    const employee = await pool.query(getSql, [employeeId]);

    if (employee.rowCount === 0) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const updateSql =
      process.env.SQL_EMPLOYEE_UPDATE_ROLE ||
      "UPDATE empleados SET rol_id = $1 WHERE id = $2";
    await pool.query(updateSql, [roleId, employeeId]);

    const deptSql =
      process.env.SQL_EMPLOYEES_BY_DEPT ||
      "SELECT * FROM empleados WHERE departamento_id = $1";
    const deptmEmployees = await pool.query(deptSql, [
      employee.rows[0].departamento_id,
    ]);

    res.json(deptmEmployees.rows);
  } catch (error) {
    next(error);
  }
});

app.delete("/employees/:id", async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);
    if (!Number.isInteger(employeeId)) {
      return res.status(400).json({ error: "Parámetro 'id' inválido" });
    }
    const deleted = await pool.query(
      "DELETE FROM empleados WHERE id = $1 RETURNING *",
      [employeeId],
    );

    if (deleted.rowCount === 0) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json({
      message: "Empleado eliminado correctamente",
      deleted: deleted.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

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
