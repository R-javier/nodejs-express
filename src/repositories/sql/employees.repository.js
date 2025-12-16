import { pool } from "../../commons/db.js";

export const getAllEmployees = async () => {
  const sql = process.env.SQL_EMPLOYEES_ALL || "SELECT * FROM empleados";

  return pool.query(sql);
};

export const getRoleWithMostEmployees = async () => {
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

  return pool.query(sql);
};

export const countEmployeesByDept = async (deptId) => {
  const sql =
    process.env.SQL_EMPLOYEES_COUNT_BY_DEPT ||
    "SELECT COUNT(*) FROM empleados WHERE departamento_id = $1";
  return pool.query(sql, [deptId]);
};

export const getEmployeesByDeptAndRole = async (deptId, roleId) => {
  const sql =
    process.env.SQL_EMPLOYEES_BY_DEPT_AND_ROLE ||
    "SELECT * FROM empleados WHERE departamento_id = $1 AND rol_id= $2";
  return pool.query(sql, [deptId, roleId]);
};

export const getEmployeesByDept = async (deptId) => {
  const sql =
    process.env.SQL_EMPLOYEES_BY_DEPT ||
    "SELECT * FROM empleados WHERE departamento_id = $1";

  return pool.query(sql, [deptId]);
};

export const getEmployeeById = async (id) => {
  const sql =
    process.env.SQL_EMPLOYEE_BY_ID || "SELECT * FROM empleados WHERE id = $1";

  return pool.query(sql, [id]);
};

export const updateEmployeeRole = async (roleId, employeeId) => {
  const sql =
    process.env.SQL_EMPLOYEE_UPDATE_ROLE ||
    "UPDATE empleados SET rol_id = $1 WHERE id = $2";

  return pool.query(sql, [roleId, employeeId]);
};

export const deleteEmployeeById = async (id) => {
  const sqlDelete =
    process.env.SQL_EMPLOYEE_DELETE_BY_ID ||
    "DELETE FROM empleados WHERE id = $1 RETURNING *";

  return pool.query(sqlDelete, [employeeId]);
};
