import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  empList: [] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobile', 'location', 'profilePic'];
  dataSource = [];
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empList = this.empService.getEmployees;
    this.dataSource = this.empList.slice(0, 5);
  }

  pageEvent(event: PageEvent): any {
    this.dataSource = this.empList.slice(event.pageSize * event.pageIndex, (event.pageSize *  (event.pageIndex + 1)));
  }
}
