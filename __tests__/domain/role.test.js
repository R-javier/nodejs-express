import { expect } from "chai";
import { validate as isUuid } from "uuid";

import Role from "../../src/domain/role.js";

describe("role domain model", () => {
  describe("constructor", () => {
    it("should create a new role", () => {
      const test_role = new Role("DevOps");

      expect(isUuid(test_role.id)).to.be.true;
      expect(test_role.name).to.equal("DevOps");
    });
    //Aca tambien deberia validar que no exista un rol con el mismo nombre ya en la db.
  });
});
