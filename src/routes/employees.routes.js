import { Router } from "express";
import {
  changeEmployeeRole,
  getEmployees,
  getEmployeesByDept,
  getEmployeesByDeptAndRole,
  getEmployeesCountByDept,
  getMaxRole,
  removeEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/", getEmployees);
router.get("/max-role", getMaxRole);
router.get("/count/:dept", getEmployeesCountByDept);
router.get("/:dept/:role", getEmployeesByDeptAndRole);
router.get("/:dept", getEmployeesByDept);

router.put("/:id/role/:role", changeEmployeeRole);
router.delete("/:id", removeEmployee);

export default router;
