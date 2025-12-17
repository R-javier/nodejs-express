process.env.NODE_ENV = "test";

import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import pool from "../../src/config/database.js";
import DepartmentRepository from "../../src/repositories/department-repository.js";

describe("Department repository", () => {
  let repository;
  let departmentData;
  let id;

  beforeEach(() => {
    id = uuidv4();
    repository = new DepartmentRepository(pool);
    departmentData = {
      id: id,
      name: "Quality Assurance",
    };
  });

  after(async () => {
    await pool.end();
  });

  describe("create", () => {
    it("should create a new department", async () => {
      const department = await repository.create(departmentData);
      expect(department).to.exist;
    });
  });

  describe("get all departments", () => {
    it("should return all departments", async () => {
      const departments = await repository.getAll();
      expect(departments).to.exist;
    });
  });

  describe("get by Id", () => {
    it("should get a department by id", async () => {
      await repository.create(departmentData);
      const foundDepartment = await repository.getById(id);
      expect(foundDepartment).to.exist;
    });
  });

  describe("delete", () => {
    it("should delete the given department", async () => {
      await repository.create(departmentData);

      await repository.delete(id);
      const foundDepartment = await repository.getById(id);
      expect(foundDepartment).to.be.null;
    });
  });
});
