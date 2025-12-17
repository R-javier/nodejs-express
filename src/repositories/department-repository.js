import TABLES from "../config/tables.js";

class DepartmentRepository {
  constructor(db) {
    this.db = db;
  }

  async create(departmentData) {
    const result = await this.db.query(
      `INSERT INTO ${TABLES.DEPARTMENTS} (id, name) VALUES ($1, $2)`,
      [departmentData.id, departmentData.name],
    );
    return result.rows;
  }
  async getAll() {
    return await this.db.query(`SELECT * FROM ${TABLES.DEPARTMENTS}`);
  }

  async getById(id) {
    const result = await this.db.query(
      `SELECT * FROM ${TABLES.DEPARTMENTS} WHERE id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async delete(id) {
    const result = await this.db.query(
      `
      DELETE FROM ${TABLES.DEPARTMENTS} 
      WHERE id = $1 
      RETURNING *
    `,
      [id],
    );
    return result.rows[0];
  }
}

export default DepartmentRepository;
