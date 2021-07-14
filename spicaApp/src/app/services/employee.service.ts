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

  constructor(private http: HttpClient, private settings: SettingsService, @Inject(TOKEN_STORAGE) private localStorage: Storage) { 
    settings.token$.subscribe(t => {
      console.log("Got token");
      this.token = t;
    });
    settings.refresh();
  }

  public getAllEmployees(): Promise<Employee[]> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.get(this.apiUrl + "/TimeApi/Employee", properties).toPromise().then(data => data as Employee[]).catch(this.handleError);
  }

  public getEmployee(id: number): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.get(this.apiUrl + "/TimeApi/Employee/" + id, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  public addEmployee(emp: Employee): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.put(this.apiUrl + "/TimeApi/Employee", emp, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  public updateEmployee(id: number, emp: Employee): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.put(this.apiUrl + "/TimeApi/Employee?ReferenceID=" + id, emp, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  public deleteEmployee(id: number): Promise<Employee> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.delete(this.apiUrl + "/TimeApi/Employee/" + id, properties).toPromise().then(data => data as any).catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    console.error('Error', err.msg || err);
    return Promise.reject(err.msg || err.message || err);
  }

}
