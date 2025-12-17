class RoleRepository {
  constructor(db) {
    this.db = db;
  }
  async create(roleData) {
    const result = await this.db.query(
      `INSERT INTO ${TABLES.ROLES} (id, name) VALUES ($1, $2)`,
      [roleData.id, roleData.name],
    );
    return result.insertId;
  }
  async getAll() {
    return await this.db.query(`SELECT * FROM ${TABLES.ROLES}`);
  }

  async getById(id) {
    return await this.db.query(`SELECT * FROM ${TABLES.ROLES} WHERE id = $1`, [
      id,
    ]);
  }

  async delete(id) {
    return await this.db.query(
      `
      DELETE FROM ${TABLES.ROLES} 
      WHERE id = $1 
      RETURNING *
    `,
      [id],
    );
  }

  async getMaxRole() {
    return await this.db.query(`
      SELECT 
        r.id,
        r.nombre,
        COUNT(e.id) AS cantidad_empleados
      FROM ${TABLES.ROLES} r
      LEFT JOIN ${TABLES.EMPLOYEES} e ON r.id = e.rol_id
      GROUP BY r.id, r.nombre
      ORDER BY cantidad_empleados DESC
      LIMIT 1
    `);
  }
}

export default RoleRepository;
