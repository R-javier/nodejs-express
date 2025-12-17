import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import pool from "../../src/config/database.js";
import EmployeeRepository from "../../src/repositories/employees-repository.js";

describe("Employee repository", () => {
  let repository;
  let employeeData;
  let id;

  before(() => {
    id = uuidv4();
    repository = new EmployeeRepository(pool);
    employeeData = {
      id: id,
      name: "Mariana",
      lastName: "Perez",
      birthday: new Date(
        Date.now() - Math.floor(Math.random() * 50 * 365 * 24 * 60 * 60 * 1000),
      ),
      role: "Desarrollador",
      department: "Operaciones",
    };
  });

  after(async () => {
    await pool.end();
  });

  describe("create", () => {
    it("should create a new employee", async () => {
      const employee = await repository.create(employeeData);
      expect(employee).to.exist;
    });
  });

  describe("find by Id", () => {
    it("should find an employee by id", async () => {
      await repository.create(employeeData);
      const foundEmployee = await repository.findById(id);
      expect(foundEmployee).to.exist;
    });
  });

  describe("get all employees", () => {
    it("should return all employees", async () => {
      const employees = await repository.getAll();
      expect(employees).to.exist;
    });
  });

  describe("update", () => {
    it("should update an existing employee", async () => {
      await repository.create(employeeData);

      await repository.update(id, {
        name: "Marcela",
        lastName: "Paez",
        role: "Recursos Humanos",
        department: "Operaciones",
      });
      const updated = await repository.findById(id);
      expect(updated.name).to.equal("Marcela");
      expect(updated.lastName).to.equal("Paez");
      expect(updated.role).to.equal("Recursos Humanos");
      expect(updated.department).to.equal("Operaciones");
    });
  });

  describe("delete", () => {
    it("should delete the given employee", async () => {
      await repository.create(employeeData);

      await repository.delete(id);
      const foundEmployee = await repository.findById(id);
      expect(foundEmployee).to.be.null;
    });
  });
});
