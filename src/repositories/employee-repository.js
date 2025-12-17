import TABLES from "../config/tables.js";

class EmployeeRepository {
  constructor(db) {
    this.db = db;
  }

  async create(employeeData) {
    const result = await this.db.query(
      `
    INSERT INTO ${TABLES.EMPLOYEES}
      (id, name, last_name, birth_date, role_id, department_id)
    SELECT
      $1,
      $2,
      $3,
      $4,
      r.id,
      d.id
    FROM ${TABLES.ROLES} r
    JOIN ${TABLES.DEPARTMENTS} d
      ON d.name = $6
    WHERE r.name = $5
    RETURNING *
    `,
      [
        employeeData.id,
        employeeData.name,
        employeeData.lastName,
        employeeData.birth_date,
        employeeData.role,
        employeeData.department,
      ],
    );
    return result.rows[0];
  }
  async getAll() {
    return await this.db.query(`SELECT * FROM ${TABLES.EMPLOYEES}`);
  }

  async getById(id) {
    const result = await this.db.query(
      `
    SELECT 
      e.*,
      r.name AS role,
      d.name AS department
    FROM ${TABLES.EMPLOYEES} e
    JOIN ${TABLES.ROLES} r ON e.role_id = r.id
    JOIN ${TABLES.DEPARTMENTS} d ON e.department_id = d.id
    WHERE e.id = $1
    `,
      [id],
    );

    return result.rows[0] ?? null;
  }
  async getByDepartment(departmentName) {
    const result = await this.db.query(
      `
    SELECT
      e.*,
      r.name AS role,
      d.name AS department
    FROM ${TABLES.EMPLOYEES} e
    JOIN ${TABLES.DEPARTMENTS} d
      ON e.department_id = d.id
    JOIN ${TABLES.ROLES} r
      ON e.role_id = r.id
    WHERE d.name = $1
    `,
      [departmentName],
    );

    return result.rows;
  }

  async getByDepartmentAndRole(departmentName, roleName) {
    const result = await this.db.query(
      `
    SELECT
      e.*,
      r.name AS role,
      d.name AS department
    FROM ${TABLES.EMPLOYEES} e
    JOIN ${TABLES.DEPARTMENTS} d
      ON e.department_id = d.id
    JOIN ${TABLES.ROLES} r
      ON e.role_id = r.id
    WHERE d.name = $1
      AND r.name = $2
    `,
      [departmentName, roleName],
    );

    return result.rows;
  }

  async countByDepartment(departmentName) {
    const result = await this.db.query(
      `
    SELECT COUNT(*) AS total
    FROM ${TABLES.EMPLOYEES} e
    JOIN ${TABLES.DEPARTMENTS} d
      ON e.department_id = d.id
    WHERE d.name = $1
    `,
      [departmentName],
    );

    return Number(result.rows[0].total);
  }

  async updateRole(employeeId, roleName) {
    return await this.db.query(
      `
    UPDATE ${TABLES.EMPLOYEES} e
    SET role_id = r.id
    FROM ${TABLES.ROLES} r
    WHERE e.id = $1
      AND r.name = $2
    `,
      [employeeId, roleName],
    );
  }
  async delete(id) {
    const result = await this.db.query(
      `
      DELETE FROM ${TABLES.EMPLOYEES} 
      WHERE id = $1 
      RETURNING *
    `,
      [id],
    );

    return result.rows[0] ?? null;
  }
}

export default EmployeeRepository;
