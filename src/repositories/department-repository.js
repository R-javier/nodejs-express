class DepartmentRepository {
  constructor(db) {
    this.db = db;
  }

  async create(departmentData) {
    const result = await this.db.query(
      `INSERT INTO ${TABLES.DEPARTMENTS} (id, name) VALUES ($1, $2)`,
      [departmentData.id, departmentData.name],
    );
    return result.insertId;
  }
  async getAll() {
    return await this.db.query(`SELECT * FROM ${TABLES.DEPARTMENTS}`);
  }

  async getById(id) {
    return await this.db.query(
      `SELECT * FROM ${TABLES.DEPARTMENTS} WHERE id = $1`,
      [id],
    );
  }

  async delete(id) {
    return await this.db.query(
      `
      DELETE FROM ${TABLES.DEPARTMENTS} 
      WHERE id = $1 
      RETURNING *
    `,
      [id],
    );
  }
}
