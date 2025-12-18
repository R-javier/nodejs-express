import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import pool from "../../src/config/database.js";
import DepartmentRepository from "../../src/repositories/department-repository.js";
import DepartmentService from "../../src/services/department-service.js";

describe("Department repository", () => {
  let repository;
  let service;
  let departmentData;
  let id;

  beforeEach(() => {
    id = uuidv4();
    repository = new DepartmentRepository(pool);
    service = new DepartmentService(repository);
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
      const department = await service.create(departmentData);
      expect(department).to.exist;
    });
  });

  describe("get all departments", () => {
    it("should return all departments", async () => {
      const departments = await service.getAll();
      expect(departments).to.exist;
    });
  });

  describe("get by Id", () => {
    it("should get a department by id", async () => {
      await service.create(departmentData);
      const foundDepartment = await service.getById(id);
      expect(foundDepartment).to.exist;
    });
  });

  describe("delete", () => {
    it("should delete the given department", async () => {
      await service.create(departmentData);

      await service.delete(id);
      const foundDepartment = await service.getById(id);
      expect(foundDepartment).to.be.null;
    });
  });
});
