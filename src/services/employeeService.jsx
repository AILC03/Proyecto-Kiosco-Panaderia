import { initialEmployees } from "../data/employees";

const KEY = "employees";

export const employeeService = {
  getAll() {
    const data = localStorage.getItem(KEY);
    if (!data) {
      localStorage.setItem(KEY, JSON.stringify(initialEmployees));
      return initialEmployees;
    }
    return JSON.parse(data);
  },

  login(number, password) {
    const employees = this.getAll();
    return employees.find(
      e => e.number === number && e.password === password && e.active
    );
  }
};