import request from "supertest";

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.DB_HOST = "localhost";
  process.env.DB_PORT = "5433";
  process.env.DB_USER = "test_user";
  process.env.DB_PASSWORD = "test_pass";
  process.env.DB_NAME = "rrhh_test";

  app = (await import("../src/server.js")).default;
});

describe("Tests básicos de /employees", () => {
  it("GET /employees/ responde 200", async () => {
    const res = await request(app).get("/employees/");
    expect(res.status).toBe(200);
  });

  it("GET /employees/IT responde 200", async () => {
    const res = await request(app).get("/employees/IT");
    expect(res.status).toBe(200);
  });

  it("GET /employees/count/IT responde 200 y tiene { count }", async () => {
    const res = await request(app).get("/employees/count/IT");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("count");
    expect(typeof res.body.count).toBe("number");
  });

  it.skip("PUT /employees/:id/role/Analista (opcional)", async () => {
    const all = await request(app)
      .get("/employees/")
      .then((r) => r.body);
    const juan = all.find((e) => e.nombre === "Juan" && e.apellido === "Pérez");
    const res = await request(app).put(`/employees/${juan.id}/role/Analista`);
    expect(res.status).toBe(200);
  });
});
