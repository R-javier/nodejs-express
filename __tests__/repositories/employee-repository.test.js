import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import pool from "../../src/config/database.js";
import EmployeeRepository from "../../src/repositories/employee-repository.js";

describe("Employee repository", () => {
  let repository;
  let employeeData;
  let id;

  beforeEach(() => {
    id = uuidv4();
    repository = new EmployeeRepository(pool);
    employeeData = {
      id: id,
      name: "Mariana",
      lastName: "Perez",
      birth_date: new Date(
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

  describe("get all employees", () => {
    it("should return all employees", async () => {
      const employees = await repository.getAll();
      expect(employees).to.exist;
    });
  });
  describe("find by Id", () => {
    it("should find an employee by id", async () => {
      await repository.create(employeeData);
      const foundEmployee = await repository.getById(id);
      expect(foundEmployee).to.exist;
    });
  });
  describe("find by department", () => {
    it("should return all employees of the given department", async () => {
      await repository.create(employeeData);
      const foundEmployees = await repository.getByDepartment(
        employeeData.department,
      );
      expect(foundEmployees).to.exist;
    });
  });

  describe("find by department and role", () => {
    it("should return all employees of the given department and role", async () => {
      await repository.create(employeeData);
      const foundEmployees = await repository.getByDepartmentAndRole(
        employeeData.department,
        employeeData.role,
      );
      expect(foundEmployees).to.exist;
    });
  });

  describe("count by department", () => {
    it("should return the number of employees in the given department", async () => {
      const countedEmployees = await repository.countByDepartment(
        employeeData.department,
      );
      expect(countedEmployees).to.be.greaterThan(0);
    });
  });

  describe("update role", () => {
    it("should update the role of an existing employee", async () => {
      await repository.create(employeeData);
      const newRole = "Recursos Humanos";
      await repository.updateRole(id, newRole);

      const updated = await repository.getById(id);
      expect(updated.role).to.equal("Recursos Humanos");
    });
  });

  describe("delete", () => {
    it("should delete the given employee", async () => {
      await repository.create(employeeData);

      await repository.delete(id);
      const foundEmployee = await repository.getById(id);
      expect(foundEmployee).to.be.null;
    });
  });
});
