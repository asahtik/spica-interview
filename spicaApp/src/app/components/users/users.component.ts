import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public employees: Employee[] = [];
  public errmsg?: string;

  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empService.getAllEmployees().then(emp => {
      this.employees = emp;
      this.errmsg = undefined;
    }).catch(err => {
      this.errmsg = err;
    });
  }

}
