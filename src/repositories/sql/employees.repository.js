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

export const getDeptByName = async (name) => {
  return pool.query(
    "SELECT id FROM departamentos WHERE LOWER(nombre) = LOWER($1)",
    [name],
  );
};

export const countEmployeesByDept = async (deptOrName) => {
  const value = (deptOrName || "").trim();

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (uuidRegex.test(value)) {
    const sqlById =
      "SELECT COUNT(*)::int AS count FROM empleados WHERE departamento_id = $1";
    return pool.query(sqlById, [value]);
  } else {
    const sqlByName = `
      SELECT COUNT(*)::int AS count
      FROM empleados e
      WHERE e.departamento_id = (
        SELECT d.id
        FROM departamentos d
        WHERE LOWER(d.nombre) = LOWER($1)
        LIMIT 1
      )
    `;
    return pool.query(sqlByName, [value]);
  }
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
    "UPDATE empleados SET rol_id = $1 WHERE id = $2 RETURNING *";
  return pool.query(sql, [roleId, employeeId]);
};

export const deleteEmployeeById = async (id) => {
  const sqlDelete =
    process.env.SQL_EMPLOYEE_DELETE_BY_ID ||
    "DELETE FROM empleados WHERE id = $1 RETURNING *";

  return pool.query(sqlDelete, [id]);
};

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getDeptIdByName = async (name) => {
  const d = await pool.query(
    "SELECT id FROM departamentos WHERE LOWER(nombre) = LOWER($1) LIMIT 1",
    [name],
  );
  return d.rowCount ? d.rows[0].id : null;
};

export const getRoleIdByName = async (name) => {
  const r = await pool.query(
    "SELECT id FROM roles WHERE LOWER(nombre) = LOWER($1) LIMIT 1",
    [name],
  );
  return r.rowCount ? r.rows[0].id : null;
};

export const getEmployeesByDeptAndRoleFlexible = async (deptKey, roleKey) => {
  const deptVal = (deptKey || "").trim();
  const roleVal = (roleKey || "").trim();

  let deptId;
  if (uuidRegex.test(deptVal)) {
    deptId = deptVal;
  } else {
    deptId = await getDeptIdByName(deptVal);
    if (!deptId) return { rows: [] };
  }

  let roleId;
  if (uuidRegex.test(roleVal)) {
    roleId = roleVal;
  } else if (/^\d+$/.test(roleVal)) {
    roleId = Number(roleVal);
  } else {
    roleId = await getRoleIdByName(roleVal);
    if (!roleId) return { rows: [] };
  }

  const sql =
    "SELECT * FROM empleados WHERE departamento_id = $1 AND rol_id = $2";
  return pool.query(sql, [deptId, roleId]);
};
