import { expect } from "chai";
import { pool } from "../setup";

const employeeRepository = require("src/repositories/employees-repository.js");

describe("Employee repository", () => {
  let repository;
  let employeeData;
  const id = uuidv4();
  before(() => {
    repository = new employeeRepository(pool);
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

  describe("create", () => {
    it("should create a new employee", async () => {
      const employee = await repository.create(employeeData);
      expect(employee).to.exist;
    });
  });
  describe("find by Id", async () => {
    await repository.create(employeeData);
    const foundEmployee = await repository.findById(id);
    expect(foundEmployee).to.exist;
  });
  describe("get all employees", async () => {
    const employees = await repository.getAll();
    expect(employees).to.exist;
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
