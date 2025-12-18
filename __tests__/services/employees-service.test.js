import { expect } from "chai";
import { validate as isUUID, v4 as uuidv4 } from "uuid";
import pool from "../../src/config/database.js";
import EmployeeRepository from "../../src/repositories/employee-repository.js";
import EmployeeService from "../../src/services/employee-service.js";

describe("Employee Service", () => {
  let service;
  let repository;

  beforeEach(() => {
    repository = new EmployeeRepository(pool);
    service = new EmployeeService(repository);
    
    employeeData = {
      name: "Rogelio",
      lastName: "Hernandez",
      birth_date: new Date(
        Date.now() - Math.floor(Math.random() * 50 * 365 * 24 * 60 * 60 * 1000),
      ),
      role: "Soporte Tecnico",
      department: "IT",
    };
  });
  after(async () => {
    await pool.end();
  });

  describe("create", () => {
    it("should create a new employee", async () => {
      const employee = await service.create(employeeData);
      expect(employee).to.exist;
      expect(isUUID(employee.id)).to.be.true;
      expect(employee.name).to.be("Rogelio");
      expect(employee.lastName).to.be("Hernandez");
      expect(employee.role).to.be("Soporte Tecnico");
      expect(employee.department).to.be("IT");
    });

    it("should throw an error if i want to assign an id", () => {
      const employeeWithId = {
        id: uuidv4(),
        ...employeeData,
      };

      expect(() => {
        service.create(employeeWithId);
      }).to.throw(Error);
    });
  });

  describe("get all employees", () => {
    it("should return all employees", async () => {
      const employees = await service.getAll();
      expect(employees).to.exist;
    });
  });

  describe("find by Id", () => {
    it("should find an employee by id", async () => {
      await service.create(employeeData);
      const foundEmployee = await service.getById(id);
      expect(foundEmployee).to.exist;
    });
    it("should throw an error when given an invalid id", () => {
      expect(() => {
        service.getById(123);
      }).to.throw(Error);
    });
    it("should return that no employee matches the id", async () => {
      newId = uuidv4();
      await expect(service.getById(newId)).to.be.rejectedWith(
        Error,
        "No se encontro ningun empleado con el id solicitado",
      );
    });
  });

  describe("find by department", () => {
    it("should return all employees of the given department", async () => {
      await service.create(employeeData);
      const foundEmployees = await service.getByDepartment(
        employeeData.department,
      );
      expect(foundEmployees).to.exist;
    });
    it("should return that no department was found when given an non existing department", async () => {
      newDepartment = "Sales";
      await expect(service.getByDepartment(newDepartment)).to.be.rejectedWith(
        Error,
        "El departamento solicitado no existe",
      );
    });
  });

  describe("find by department and role", () => {
    it("should return all employees of the given department and role", async () => {
      await service.create(employeeData);
      const foundEmployees = await service.getByDepartmentAndRole(
        employeeData.department,
        employeeData.role,
      );
      expect(foundEmployees).to.exist;
    });
    it("should return that either the role or the department do not exist when given a non exiting department or role", async () => {
      newDepartment = "Sales";
      newRole = "Doctor";
      await expect(
        service.getByDepartmentAndRole(newDepartment, newRole),
      ).to.be.rejectedWith(Error, "El departamento o rol solicitado no existe");
    });
  });
});

describe("count by department", () => {
  it("should return the number of employees in the given department", async () => {
    const countedEmployees = await service.countByDepartment(
      employeeData.department,
    );
    expect(countedEmployees).to.be.greaterThan(0);
  });
  it("should return that no department was found when given an non existing department", async () => {
    newDepartment = "Sales";
    await expect(service.countByDepartment(newDepartment)).to.be.rejectedWith(
      Error,
      "El departamento solicitado no existe",
    );
  });
});

describe("update role", () => {
  it("should update the role of an existing employee", async () => {
    const newRole = "Recursos Humanos";
    await service.updateRole(id, newRole);

    const updated = await service.getById(id);
    expect(updated.role).to.equal("Recursos Humanos");
  });
  it("should throw an error when given an invalid role", async () => {
    await service.create(employeeData);
    const newRole = "Doctor";

    await expect(service.updateRole(id, newRole)).to.be.rejectedWith(
      Error,
      "El rol que se esta queriendo asignar es invalido",
    );
  });

  describe("delete", () => {
    it("should delete the given employee", async () => {
      await service.create(employeeData);

      await service.delete(id);
      const foundEmployee = await service.getById(id);
      expect(foundEmployee).to.be.null;
    });
    it("should throw an error when given an invalid id", () => {
      expect(() => {
        service.delete(123);
      }).to.throw(Error);
    });
    it("should return that no employee matches the id", async () => {
      newId = uuidv4();
      await expect(service.delete(newId)).to.be.rejectedWith(
        Error,
        "No se encontro ningun empleado con el id solicitado",
      );
    });
  });
});
