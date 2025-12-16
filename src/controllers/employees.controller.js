import {
  changeEmployeeRole as changeEmployeeRoleService,
  getEmployeesCountByDept as getEmployeesCountByDeptService,
  getMaxRole as getMaxRoleService,
  listEmployees,
  listEmployeesByDept,
  listEmployeesByDeptAndRole,
  removeEmployee as removeEmployeeService,
} from "../services/employees.service.js";

export const getEmployees = async (req, res, next) => {
  try {
    const data = await listEmployees();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMaxRole = async (req, res, next) => {
  try {
    const data = await getMaxRoleService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getEmployeesCountByDept = async (req, res) => {
  try {
    const { dept } = req.params;

    const { rows } = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM empleados e
      JOIN departamentos d ON e.departamento_id = d.id
      WHERE d.nombre = $1
      `,
      [dept],
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const changeEmployeeRole = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);
    const roleId = Number(req.params.role);

    if (!Number.isInteger(employeeId) || !Number.isInteger(roleId)) {
      return res
        .status(400)
        .json({ error: "Parámetros 'id' o 'role' inválidos" });
    }

    const data = await changeEmployeeRoleService(employeeId, roleId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const removeEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);

    if (!Number.isInteger(employeeId)) {
      return res.status(400).json({ error: "Parámetro 'id' inválido" });
    }

    const deleted = await removeEmployeeService(employeeId);

    res.json({
      message: "Empleado eliminado correctamente",
      deleted,
    });
  } catch (error) {
    next(error);
  }
};
