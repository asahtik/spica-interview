import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN_STORAGE } from '../classes/token-storage';
import { Employee } from '../classes/employee';
import { environment } from 'src/environments/environment';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;
  private token?: string | null;

  constructor(private http: HttpClient, settings: SettingsService) { 
    settings.token$.subscribe(t => {
      this.token = t;
    });
    settings.refresh();
  }

  // Get list of all employees
  public getAllEmployees(): Promise<Employee[]> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.get(this.apiUrl + "/TimeApi/Employee", properties).toPromise().then(data => data as Employee[]).catch(this.handleError);
  }

  // Get employee by ID
  public getEmployee(id: number): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.get(this.apiUrl + "/TimeApi/Employee/" + id, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  // Add new employee
  public addEmployee(emp: Employee): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.put(this.apiUrl + "/TimeApi/Employee", emp, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  // Update existing employee
  public updateEmployee(id: number, emp: Employee): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.put(this.apiUrl + "/TimeApi/Employee?Userno=" + id, emp, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  // Delete employee
  public deleteEmployee(id: number): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.delete(this.apiUrl + "/TimeApi/Employee/" + id, properties).toPromise().then(data => data as any).catch(this.handleError);
  }

  // Handle http error
  private handleError(err: any): Promise<any> {
    console.error('Error', err.msg || err);
    return Promise.reject(err.msg || err.message || err);
  }

}
