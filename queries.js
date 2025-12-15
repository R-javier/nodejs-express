const TABLES = {
  EMPLOYEES: process.env.TABLE_EMPLOYEES || "empleados",
  ROLES: process.env.TABLE_ROLES || "roles",
  DEPARTMENTS: process.env.TABLE_DEPARTMENTS || "departamentos",
};

export const queries = {
  employees: {
    getAll: `SELECT * FROM ${TABLES.EMPLOYEES}`,

    getById: `SELECT * FROM ${TABLES.EMPLOYEES} WHERE id = $1`,

    getByDepartment: `
      SELECT * FROM ${TABLES.EMPLOYEES} 
      WHERE departamento_id = $1
    `,

    getByDepartmentAndRole: `
      SELECT * FROM ${TABLES.EMPLOYEES} 
      WHERE departamento_id = $1 AND rol_id = $2
    `,

    countByDepartment: `
      SELECT COUNT(*) FROM ${TABLES.EMPLOYEES} 
      WHERE departamento_id = $1
    `,

    updateRole: `
      UPDATE ${TABLES.EMPLOYEES} 
      SET rol_id = $1 
      WHERE id = $2
    `,

    delete: `
      DELETE FROM ${TABLES.EMPLOYEES} 
      WHERE id = $1 
      RETURNING *
    `,
  },

  roles: {
    getMaxRole: `
      SELECT 
        r.id,
        r.nombre,
        COUNT(e.id) AS cantidad_empleados
      FROM ${TABLES.ROLES} r
      LEFT JOIN ${TABLES.EMPLOYEES} e ON r.id = e.rol_id
      GROUP BY r.id, r.nombre
      ORDER BY cantidad_empleados DESC
      LIMIT 1
    `,
  },
};
