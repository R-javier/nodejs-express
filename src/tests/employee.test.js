import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("Employees API", () => {
  it("GET /employees", async () => {
    const res = await request(app).get("/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// import request from "supertest";
// import { afterEach, beforeAll, describe, expect, it } from "vitest";
// import app from "../app.js";

// import { cleanDatabase, pool, setupDatabase } from "./setupTestDB.js";

// beforeAll(async () => {
//   await setupDatabase();
// });

// afterEach(async () => {
//   await cleanDatabase();
// });

// describe("GET /employees", () => {
//   it("debería devolver una lista de empleados", async () => {
//     // insertamos datos de prueba
//     await pool.query(`
//       INSERT INTO roles (nombre) VALUES ('Analista');
//       INSERT INTO departamentos (nombre) VALUES ('IT');

//       INSERT INTO empleados
//       (nombre, apellido, fecha_nacimiento, rol_id, departamento_id)
//       VALUES (
//         'Juan',
//         'Perez',
//         '1990-01-01',
//         (SELECT id FROM roles LIMIT 1),
//         (SELECT id FROM departamentos LIMIT 1)
//       );
//     `);

//     const res = await request(app).get("/employees");

//     expect(res.status).toBe(200);
//     expect(res.body.length).toBe(1);
//     expect(res.body[0].nombre).toBe("Juan");
//   });
// });
