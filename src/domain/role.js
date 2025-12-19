import { v4 as uuidv4 } from "uuid";

class Role {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }
}

export default Role;
