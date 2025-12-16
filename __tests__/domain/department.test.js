import { expect } from "chai";

const department = require("src/domain/department.js");

describe("department domain model", () => {
  describe("constructor", () => {
    test("should create a new department", () => {
      const test_department = new department("PMO");

      expect(test_department.name).to.equal("PMO");
    });
    //Aca tambien deberia validar que no exista un departamento con el mismo nombre ya en la db.
  });
});
