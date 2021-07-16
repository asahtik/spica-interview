import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../classes/employee';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private apiUrl = environment.apiUrl;
  private token?: string | null;

  constructor(private http: HttpClient, settings: SettingsService) { 
    settings.token$.subscribe(t => {
      this.token = t;
    });
    settings.refresh();
  }

  // Get list of all employees present
  public getAllPresent(): Promise<Employee[]> {
    if(!this.token || this.token == "empty") return this.handleError("Token not valid. Please set it in settings");
    const properties = {
      headers: new HttpHeaders({
        'Authorization': `SpicaToken ${this.token}`
      })
    };
    return this.http.get(`${this.apiUrl}/TimeApi/Presence?TimeStamp=${new Date().toISOString()}&OrgUnitID=10000000&showInactiveEmployees=false`, properties).toPromise().then(data => data as Employee[]).catch(this.handleError);
  }

  // Handle http error
  private handleError(err: any): Promise<any> {
    console.error('Error', err.msg || err);
    return Promise.reject(err.msg || err.message || err);
  }

}
