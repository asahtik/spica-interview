import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN_STORAGE } from '../classes/token-storage';
import { Employee } from '../classes/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(TOKEN_STORAGE) private localStorage: Storage) { }

  public getAllEmployees(): Promise<Employee[]> {
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.apiUrl + "/TimeApi/Employee", properties).toPromise().then(data => data as Employee[]).catch(this.handleError);
  }

  public getEmployee(id: number): Promise<Employee> {
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.apiUrl + "/TimeApi/Employee/" + id, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  public addEmployee(emp: Employee): Promise<Employee> {
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.localStorage.getItem('token')}`
      })
    };
    return this.http.put(this.apiUrl + "/TimeApi/Employee", emp, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  public updateEmployee(id: number, emp: Employee): Promise<Employee> {
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.localStorage.getItem('token')}`
      })
    };
    return this.http.put(this.apiUrl + "/TimeApi/Employee?ReferenceID=" + id, emp, properties).toPromise().then(data => data as Employee).catch(this.handleError);
  }

  public deleteEmployee(id: number): Promise<Employee> {
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.localStorage.getItem('token')}`
      })
    };
    return this.http.delete(this.apiUrl + "/TimeApi/Employee/" + id, properties).toPromise().then(data => data as any).catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    console.error('Error', err.msg || err);
    return Promise.reject(err.msg || err);
  }

}
