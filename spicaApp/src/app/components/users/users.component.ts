import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public employees: Employee[] = [];
  public employee: Employee | null = null;
  public newEmployee: Employee = {
    FirstName: "",
    LastName: ""
  }
  public errmsg?: string;

  public pageSize = 30;
  public currPage = 1;

  public addIsCollapsed = true;

  constructor(private empService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  public showDetails(emp: Employee, content: any) {
    this.employee = emp;
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  public loadEmployees() {
    this.empService.getAllEmployees().then(emp => {
      this.employees = emp;
      this.errmsg = undefined;
    }).catch(err => {
      this.errmsg = err;
    });
  }

  public addEmployee() {
    this.empService.addEmployee(this.newEmployee).then(emp => {
      this.employees.push(emp);
      this.errmsg = undefined;
      this.clearNewEmployee();
    }).catch(err => {
      this.errmsg = err;
    });
  }

  private clearNewEmployee() {
    this.newEmployee = {
      FirstName: "",
      LastName: ""
    }
  }

}
