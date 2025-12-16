import { expect } from "chai";

const role = require("src/domain/roles.js");

describe("role domain model", () => {
  describe("constructor", () => {
    test("should create a new role", () => {
      const test_role = new role("DevOps");

      expect(test_role.name).to.equal("DevOps");
    });
    //Aca tambien deberia validar que no exista un rol con el mismo nombre ya en la db.
  });
});
