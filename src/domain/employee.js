import { v4 as uuidv4 } from "uuid";

class Employee {
  constructor(name, lastName, birthday, role, department) {
    this.id = uuidv4();
    this.name = name;
    this.lastName = lastName;
    this.birthday = birthday;
    this.role = role;
    this.department = department;
  }
}

export default Employee;
