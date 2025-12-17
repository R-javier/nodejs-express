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
  async getByDepartment(departmentId) {
    return await this.db.query(
      `
      SELECT * FROM ${TABLES.EMPLOYEES} 
      WHERE department_id = $1
    `,
      [departmentId],
    );
  }
  async getByDepartmentAndRole(departmentId, roleId) {
    return await this.db.query(
      `
      SELECT * FROM ${TABLES.EMPLOYEES} 
      WHERE department_id = $1 AND role_id = $2
    `,
      [departmentId, roleId],
    );
  }

  async countByDepartment(departmentId) {
    return await this.db.query(
      `
      SELECT COUNT(*) FROM ${TABLES.EMPLOYEES} 
      WHERE department_id = $1
    `,
      [departmentId],
    );
  }

  async updateRole(id, rolId) {
    return await this.db.query(
      `
      UPDATE ${TABLES.EMPLOYEES} 
      SET role_id = $1 
      WHERE id = $2
    `,
      [rolId, id],
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
