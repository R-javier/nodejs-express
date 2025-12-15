import express from "express";
import { Pool } from "pg";
import "dotenv/config";
import { parse } from "dotenv";
import { queries } from "./queries";

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parse.int(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.get("/employees", async (req, res) => {
  try {
    const data = await pool.query(queries.employees.getAll);
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/employees/maxrole", async (req, res) => {
  try {
    const maxrole = await pool.query(queries.roles.getMaxRole);

    res.json(maxrole.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/employees/count/:dept", async (req, res) => {
  const deptId = req.params.dept;
  try {
    const deptCountEmployees = await pool.query(
      queries.employees.countByDepartment,
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
      queries.employees.getByDepartmentAndRole,
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
    const deptEmployees = await pool.query(queries.employees.getByDepartment, [
      deptId,
    ]);
    res.json(deptEmployees.rows);
  } catch (error) {
    console.log(error);
  }
});

app.put("/employees/:id/:role", async (req, res) => {
  const employeeId = req.params.id;
  const roleId = req.params.role;
  try {
    const employee = await pool.query(queries.employees.getById, [employeeId]);
    await pool.query(queries.employees.updateRole, [roleId, employeeId]);
    const deptmEmployees = await pool.query(queries.employees.getByDepartment, [
      employee.rows[0].departamento_id,
    ]);
    res.json(deptmEmployees.rows);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/employees/:id", async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await pool.query(queries.employees.delete, [employeeId]);

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
