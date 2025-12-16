import {
  getEmployeesCountByDept,
  getMaxRole,
  listEmployees,
  listEmployeesByDept,
  listEmployeesByDeptAndRole,
} from "../services/employees.service.js";

export const getEmployees = async (req, res, next) => {
  try {
    const data = await listEmployees();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getEmployeesMaxRole = async (req, res, next) => {
  try {
    const data = await getMaxRole();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getEmployeesCount = async (req, res, next) => {
  try {
    const deptId = Number(req.params.dept);

    if (!Number.isInteger(deptId)) {
      return res.status(400).json({ error: "Parámetro 'dept' inválido" });
    }

    const data = await getEmployeesCountByDept(deptId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getEmployeesByDeptAndRole = async (req, res, next) => {
  try {
    const deptId = Number(req.params.dept);
    const roleId = Number(req.params.role);

    if (!Number.isInteger(deptId) || !Number.isInteger(roleId)) {
      return res
        .status(400)
        .json({ error: "Parámetros 'dept' o 'role' inválidos" });
    }

    const data = await listEmployeesByDeptAndRole(deptId, roleId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getEmployeesByDept = async (req, res, next) => {
  try {
    const deptId = Number(req.params.dept);

    if (!Number.isInteger(deptId)) {
      return res.status(400).json({ error: "Parámetro 'dept' inválido" });
    }

    const data = await listEmployeesByDept(deptId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeRole = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);
    const roleId = Number(req.params.role);

    if (!Number.isInteger(employeeId) || !Number.isInteger(roleId)) {
      return res
        .status(400)
        .json({ error: "Parámetros 'id' o 'role' inválidos" });
    }

    const data = await changeEmployeeRole(employeeId, roleId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

import { removeEmployee } from "../services/employees.service.js";

export const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);

    if (!Number.isInteger(employeeId)) {
      return res.status(400).json({ error: "Parámetro 'id' inválido" });
    }

    const deleted = await removeEmployee(employeeId);

    res.json({
      message: "Empleado eliminado correctamente",
      deleted,
    });
  } catch (error) {
    next(error);
  }
};
