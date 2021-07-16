import { Component, Input, OnInit } from '@angular/core';
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
  public employee: Employee = {
    FirstName: "",
    LastName: ""
  };
  public newEmployee: Employee = {
    FirstName: "",
    LastName: ""
  }
  public errmsg?: string;
  public succMsg: boolean = false;

  public pageSize = 30;
  public currPage = 1;

  public addIsCollapsed = true;
  public editEnabled = false;

  public searchString = "";
  public searchTerms: string[] = [];

  constructor(private empService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Show employee details
  public showDetails(emp: Employee, content: any) {
    this.employee = emp;
    this.editEnabled = false;
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  // Load list of employees from API
  public loadEmployees() {
    this.searchTerms = [];
    this.searchString = "";
    this.empService.getAllEmployees().then(emp => {
      this.employees = emp;
      this.errmsg = undefined;
    }).catch(err => {
      this.errmsg = err;
    });
  }

  // Add new employee
  public addEmployee() {
    this.empService.addEmployee(this.newEmployee).then(emp => {
      this.employees.push(emp);
      this.errmsg = undefined;
      this.clearNewEmployee();
      this.succMsg = true;
      setTimeout(() => this.succMsg = false, 3000);
    }).catch(err => {
      this.errmsg = err;
    });
  }

  // Update selected employee
  public updateEmployee() {
    if(!this.editEnabled) this.editEnabled = true;
    else if(this.employee.Id) {
      this.empService.updateEmployee(this.employee.Id, this.employee).then(emp => {
        this.updateInList(emp);
        this.employee = emp;
        this.editEnabled = false;
      }).catch(err => {
        this.errmsg = err;
      });
    }
  }

  // Remove selected employee
  public removeEmployee(modal: any) {
    if(this.employee.Id)
      this.empService.deleteEmployee(this.employee.Id).then(() => {
        this.updateInList(this.employee, true);
        this.editEnabled = false;
        modal.close("Close click");
      }).catch(err => {
        this.errmsg = err;
      });
  }

  // Set array of strings to match with employee names
  public setSearchTerms() {
    this.searchTerms = this.searchString.split(" ");
    this.currPage = 1;
  }

  // Clear form for new employee
  private clearNewEmployee() {
    this.newEmployee = {
      FirstName: "",
      LastName: ""
    }
  }

  // Update or remove employee in list
  private updateInList(e: Employee, remove: boolean = false) {
    for(var i = 0; i < this.employees.length; i++) {
      if(this.employees[i].Id == e.Id) 
        if(!remove) this.employees[i] = e;
        else this.employees.splice(i, 1);
    }
  }

}
