import {
  countEmployeesByDept,
  getAllEmployees,
  getEmployeeById,
  getEmployeesByDept,
  getEmployeesByDeptAndRole,
  getRoleWithMostEmployees,
  updateEmployeeRole,
} from "../repositories/sql/employees.repository.js";

export const listEmployees = async () => {
  const result = await getAllEmployees();
  return result.rows;
};

export const getMaxRole = async () => {
  const maxrole = await getRoleWithMostEmployees();
  return maxrole.rows;
};

export const getEmployeesCountByDept = async () => {
  const deptCountEmployees = await countEmployeesByDept(deptId);
  return deptCountEmployees.rows;
};

export const listEmployeesByDeptAndRole = async () => {
  const deptRoleEmployees = await getEmployeesByDeptAndRole(deptId, roleId);
  return deptRoleEmployees.rows;
};

export const listEmployeesByDept = async (deptId) => {
  const deptEmployees = await getEmployeesByDept(deptId);
  return deptEmployees.rows;
};

export const changeEmployeeRole = async (employeeId, roleId) => {
  const employee = await getEmployeeById(employeeId);

  if (employee.rowCount === 0) {
    const error = new Error("Empleado no encontrado");
    error.status = 404;
    throw error;
  }

  await updateEmployeeRole(roleId, employeeId);

  const deptId = employee.rows[0].departamento_id;
  const deptEmployees = await getEmployeesByDept(deptId);

  return deptEmployees.rows;
};

import { deleteEmployeeById } from "../repositories/sql/employees.repository.js";

export const removeEmployee = async (employeeId) => {
  const deleted = await deleteEmployeeById(employeeId);

  if (deleted.rowCount === 0) {
    const error = new Error("Empleado no encontrado");
    error.status = 404;
    throw error;
  }

  return deleted.rows[0];
};
