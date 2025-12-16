import { Router } from "express";
import {
  getEmployees,
  getEmployeesByDept,
  getEmployeesByDeptAndRole,
  getEmployeesCountByDept,
  getMostStaffedRole,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees/maxrole", getMostStaffedRole);
router.get("/employees/count/:dept", getEmployeesCountByDept);

router.get("/employees/:dept/:role", getEmployeesByDeptAndRole);
router.get("/employees/:dept", getEmployeesByDept);

router.get("/employees", getEmployees);

export default router;
