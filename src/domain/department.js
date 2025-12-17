import { v4 as uuidv4 } from "uuid";

class Department {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }
}

export default Department;