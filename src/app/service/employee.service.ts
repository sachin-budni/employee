import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeService {
  empList: [];
  constructor(private router: Router) { }

  get getEmployees(): [] {
    return JSON.parse(localStorage.getItem('employees'));
  }
  addEmployee(emp): any {
    const value = this.getEmployees ? [...this.getEmployees, emp] : [emp];
    localStorage.setItem('employees', JSON.stringify(value));
    this.router.navigate(['list-employee']);
  }
}
