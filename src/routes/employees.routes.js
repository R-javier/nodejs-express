import { Router } from "express";
import {
  deleteEmployee,
  getEmployees,
  getEmployeesByDept,
  getEmployeesByDeptAndRole,
  getEmployeesCount,
  getEmployeesMaxRole,
  updateEmployeeRole,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/", getEmployees);
router.get("/maxrole", getEmployeesMaxRole);
router.get("/count:dept", getEmployeesCount);
router.get("/:dept/:role", getEmployeesByDeptAndRole);
router.get("/:dept", getEmployeesByDept);
router.get(":/id/:role", updateEmployeeRole);
router.get("/:id", deleteEmployee);
export default router;
