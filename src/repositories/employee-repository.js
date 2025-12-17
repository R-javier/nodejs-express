class EmployeeRepository {
  constructor(db) {
    this.db = db;
  }

  async create(employeeData) {
    const result = await this.db.query(
      `INSERT INTO ${TABLES.EMPLOYEES} (id, name, last_name, birthday, role_id, department_id) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        employeeData.id,
        employeeData.name,
        employeeData.lastName,
        employeeData.birthday,
        employeeData.roleId,
        employeeData.departmentId,
      ],
    );
    return result.insertId;
  }
  async getAll() {
    return await this.db.query(`SELECT * FROM ${TABLES.EMPLOYEES}`);
  }

  async getById(id) {
    return await this.db.query(
      `SELECT * FROM ${TABLES.EMPLOYEES} WHERE id = $1`,
      [id],
    );
  }
  async getByDepartment(departmentName) {
    return await this.db.query(
      `
    SELECT e.*
    FROM ${TABLES.EMPLOYEES} e
    JOIN ${TABLES.DEPARTMENTS} d
      ON e.department_id = d.id
    WHERE d.name = $1
    `,
      [departmentName],
    );
  }
  async getByDepartmentAndRole(departmentName, roleName) {
    return await this.db.query(
      `
    SELECT e.*
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
  }

  async countByDepartment(departmentName) {
    return await this.db.query(
      `
    SELECT COUNT(*) AS total
    FROM ${TABLES.EMPLOYEES} e
    JOIN ${TABLES.DEPARTMENTS} d
      ON e.department_id = d.id
    WHERE d.name = $1
    `,
      [departmentName],
    );
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
    return await this.db.query(
      `
      DELETE FROM ${TABLES.EMPLOYEES} 
      WHERE id = $1 
      RETURNING *
    `,
      [id],
    );
  }
}

export default EmployeeRepository;
