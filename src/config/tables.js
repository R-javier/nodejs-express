const TABLES = {
  EMPLOYEES: process.env.TABLE_EMPLOYEES || "employees",
  ROLES: process.env.TABLE_ROLES || "roles",
  DEPARTMENTS: process.env.TABLE_DEPARTMENTS || "departments",
};

export default TABLES;
