import TABLES from "../config/tables.js";

class RoleRepository {
  constructor(db) {
    this.db = db;
  }
  async create(roleData) {
    const result = await this.db.query(
      `INSERT INTO ${TABLES.ROLES} (id, name) VALUES ($1, $2) RETURNING *`,
      [roleData.id, roleData.name],
    );
    return result.rows[0];
  }
  async getAll() {
    return await this.db.query(`SELECT * FROM ${TABLES.ROLES}`);
  }

  async getById(id) {
    const result = await this.db.query(
      `SELECT * FROM ${TABLES.ROLES} WHERE id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async delete(id) {
    const result = await this.db.query(
      `
        DELETE FROM ${TABLES.ROLES} 
        WHERE id = $1 
        RETURNING *
      `,
      [id],
    );
    // return result.rows[0] ?? null;
  }

  async getMaxRole() {
    const result = await this.db.query(`
        SELECT 
          r.id,
          r.name,
          COUNT(e.id) AS cantidad_empleados
        FROM ${TABLES.ROLES} r
        LEFT JOIN ${TABLES.EMPLOYEES} e ON r.id = e.role_id
        GROUP BY r.id, r.name
        ORDER BY cantidad_empleados DESC
        LIMIT 1
      `);
    return result.rows[0];
  }
}

export default RoleRepository;
