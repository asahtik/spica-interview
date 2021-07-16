import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/classes/employee';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  public employees: Employee[] = [];
  public employee: Employee = {
    FirstName: "",
    LastName: ""
  };
  public errmsg?: string;

  public pageSize = 20;
  public currPage = 1;

  public searchString = "";
  public searchTerms: string[] = [];
  
  constructor(private presService: PresenceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  public showDetails(emp: Employee, content: any) {
    this.employee = emp;
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  public loadEmployees() {
    this.presService.getAllPresent().then(emp => {
      this.employees = emp;
      this.searchTerms = [];
      this.errmsg = undefined;
    }).catch(err => {
      this.errmsg = err;
    });
  }

  public setSearchTerms() {
    this.searchTerms = this.searchString.split(" ");
  }

}
