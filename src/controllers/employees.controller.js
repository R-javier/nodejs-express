import {
  changeEmployeeRoleService,
  getEmployeesCountByDept as getEmployeesCountByDeptService,
  getMaxRole as getMaxRoleService,
  listEmployees,
  listEmployeesByDeptAndRole,
  listEmployeesByDeptName,
  removeEmployeeService,
} from "../services/employees.service.js";

// TODOS
export const getEmployees = async (req, res, next) => {
  try {
    const data = await listEmployees();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// ROL CON MÁS EMPLEADOS
export const getMaxRole = async (req, res, next) => {
  try {
    const data = await getMaxRoleService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// CONTAR por nombre o UUID de depto
export const getEmployeesCountByDept = async (req, res, next) => {
  try {
    const { dept } = req.params; // 'ventas' o un UUID
    const data = await getEmployeesCountByDeptService(dept);
    res.json(data); // -> { count: <int> }
  } catch (error) {
    next(error);
  }
};

// EMPLEADOS por deptId y roleId (números)

export const getEmployeesByDeptAndRole = async (req, res, next) => {
  try {
    const { dept, role } = req.params; // strings: nombre/uuid/número
    const data = await listEmployeesByDeptAndRole(dept, role);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// EMPLEADOS por nombre de depto
export const getEmployeesByDept = async (req, res, next) => {
  try {
    const { dept } = req.params; // ej: 'ventas'
    const result = await listEmployeesByDeptName(dept);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// CAMBIAR ROL (usa changeEmployeeRoleService)

export const changeEmployeeRole = async (req, res, next) => {
  try {
    const employeeId = (req.params.id || "").trim(); // UUID esperado
    const roleKey = (req.params.role || "").trim(); // nombre/num/uuid

    if (!employeeId) {
      return res.status(400).json({ error: "Parámetro 'id' inválido (vacío)" });
    }

    const data = await changeEmployeeRoleService(employeeId, roleKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// ELIMINAR EMPLEADO (usa removeEmployeeService)
export const removeEmployee = async (req, res, next) => {
  try {
    const employeeId = Number(req.params.id);

    if (!Number.isInteger(employeeId)) {
      return res
        .status(400)
        .json({ error: "Parámetro 'id' inválido (debe ser número)" });
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
