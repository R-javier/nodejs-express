import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 3000,
  PGHOST: process.env.PGHOST || "db",
  PGPORT: Number(process.env.PGPORT || 5432),
  PGUSER: process.env.PGUSER || "admin",
  PGPASSWORD: process.env.PGPASSWORD || "password",
  PGDATABASE: process.env.PGDATABASE || "rrhh-db",

  SQL_EMPLOYEES_ALL: process.env.SQL_EMPLOYEES_ALL,
  SQL_ROLES_MOST_STAFFED: process.env.SQL_ROLES_MOST_STAFFED,
  SQL_EMPLOYEES_COUNT_BY_DEPT: process.env.SQL_EMPLOYEES_COUNT_BY_DEPT,
  SQL_EMPLOYEES_BY_DEPT_AND_ROLE: process.env.SQL_EMPLOYEES_BY_DEPT_AND_ROLE,
  SQL_EMPLOYEES_BY_DEPT: process.env.SQL_EMPLOYEES_BY_DEPT,
  SQL_EMPLOYEE_BY_ID: process.env.SQL_EMPLOYEE_BY_ID,
  SQL_EMPLOYEE_UPDATE_ROLE: process.env.SQL_EMPLOYEE_UPDATE_ROLE,
  SQL_EMPLOYEE_DELETE_BY_ID: process.env.SQL_EMPLOYEE_DELETE_BY_ID,
};
