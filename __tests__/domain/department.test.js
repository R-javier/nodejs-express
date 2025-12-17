import { expect } from "chai";
import { validate as isUuid } from "uuid";
import Department from "../../src/domain/department.js";

describe("department domain model", () => {
  describe("constructor", () => {
    it("should create a new department", () => {
      const test_department = new Department("PMO");

      expect(isUuid(test_department.id)).to.be.true;
      expect(test_department.name).to.equal("PMO");
    });
    //Aca tambien deberia validar que no exista un departamento con el mismo nombre ya en la db.
  });
});
