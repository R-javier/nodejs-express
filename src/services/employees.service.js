import {
  countEmployeesByDept,
  deleteEmployeeById,
  getAllEmployees,
  getDeptByName,
  getEmployeesByDept,
  getEmployeesByDeptAndRoleFlexible,
  getRoleIdByName,
  getRoleWithMostEmployees,
  updateEmployeeRole,
} from "../repositories/sql/employees.repository.js";

// LISTAR TODOS
export const listEmployees = async () => {
  const result = await getAllEmployees();
  return result.rows;
};

// ROL CON MÁS EMPLEADOS
export const getMaxRole = async () => {
  const result = await getRoleWithMostEmployees();
  return result.rows[0] || null;
};

export const getEmployeesCountByDept = async (deptParam) => {
  const clean = (deptParam || "").trim();
  if (!clean) {
    const err = new Error("Parámetro 'dept' inválido (vacío)");
    err.status = 400;
    throw err;
  }
  const result = await countEmployeesByDept(clean);
  return result.rows[0];
};

export const listEmployeesByDeptName = async (deptName) => {
  const clean = (deptName || "").trim();
  if (!clean) {
    const err = new Error("Parámetro 'dept' inválido");
    err.status = 400;
    throw err;
  }

  const deptResult = await getDeptByName(clean);
  if (deptResult.rowCount === 0) {
    const err = new Error(`Departamento no existe: ${clean}`);
    err.status = 404;
    throw err;
  }

  const deptId = deptResult.rows[0].id;
  const employees = await getEmployeesByDept(deptId);
  return employees.rows;
};

export const listEmployeesByDeptAndRole = async (deptKey, roleKey) => {
  const result = await getEmployeesByDeptAndRoleFlexible(deptKey, roleKey);
  return result.rows;
};

export const changeEmployeeRoleService = async (employeeId, roleKey) => {
  let roleId;
  const raw = (roleKey || "").trim();

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (uuidRegex.test(raw)) {
    roleId = raw;
  } else if (/^\d+$/.test(raw)) {
    roleId = Number(raw);
  } else {
    roleId = await getRoleIdByName(raw);
    if (!roleId) {
      const err = new Error(`Rol no existe: ${raw}`);
      err.status = 404;
      throw err;
    }
  }

  const updated = await updateEmployeeRole(roleId, employeeId);
  if (updated.rowCount === 0) {
    const err = new Error("Empleado no encontrado");
    err.status = 404;
    throw err;
  }
  return updated.rows[0];
};

export const removeEmployeeService = async (employeeId) => {
  const deleted = await deleteEmployeeById(employeeId);
  if (deleted.rowCount === 0) {
    const err = new Error("Empleado no encontrado");
    err.status = 404;
    throw err;
  }
  return deleted.rows[0];
};
