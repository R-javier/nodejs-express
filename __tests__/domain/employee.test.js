import { expect } from "chai";
import { validate as isUuid } from "uuid";
import Employee from "../../src/domain/employee.js";

describe("employee domain model", () => {
  describe("constructor", () => {
    it("should create a new employee", () => {
      const test_employee = new Employee(
        "Juan",
        "Garcia",
        "1998-06-18",
        "Gerente",
        "Marketing",
      );

      expect(isUuid(test_employee.id)).to.be.true;
      expect(test_employee.name).to.equal("Juan");
      expect(test_employee.lastName).to.equal("Garcia");
      expect(test_employee.birthday).to.equal("1998-06-18");
      expect(test_employee.role).to.equal("Gerente");
      expect(test_employee.department).to.equal("Marketing");
    });
    // Querria agregar una validacion para que no puedas asignarle un dpto o un rol que no exista en la bd.
  });
});
