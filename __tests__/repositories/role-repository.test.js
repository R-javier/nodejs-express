process.env.NODE_ENV = "test";

import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import pool from "../../src/config/database.js";
import RolesRepository from "../../src/repositories/role-repository.js";

describe("Role repository", () => {
  let repository;
  let roleData;
  let id;

  beforeEach(() => {
    id = uuidv4();
    repository = new RolesRepository(pool);
    roleData = {
      id: id,
      name: "QA Engineer",
    };
  });

  after(async () => {
    await pool.end();
  });

  describe("create", () => {
    it("should create a new role", async () => {
      const role = await repository.create(roleData);
      expect(role).to.exist;
    });
  });

  describe("get all roles", () => {
    it("should return all roles", async () => {
      const roles = await repository.getAll();
      expect(roles).to.exist;
    });
  });

  describe("find by Id", () => {
    it("should find a role by id", async () => {
      await repository.create(roleData);
      const foundRole = await repository.getById(id);
      expect(foundRole).to.exist;
    });
  });
  describe("delete", () => {
    it("should delete the given role", async () => {
      await repository.create(roleData);

      await repository.delete(id);
      const foundRole = await repository.getById(id);
      expect(foundRole).to.be.null;
    });
  });
  describe("getMaxRole", () => {
    it("should return the role with the most employees asigned", async () => {
      const maxRole = await repository.getMaxRole(roleData);
      expect(maxRole).to.exist;
    });
  });
});
