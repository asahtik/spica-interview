import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TOKEN_STORAGE } from '../classes/token-storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private token = new Subject<string | null>();
  public token$ = this.token.asObservable();

  constructor(@Inject(TOKEN_STORAGE) private localStorage: Storage) { 
    this.localStorage.setItem('token', "EBD9E633-EF6E-468D-BD0A-E9183B615EA7");
    this.token.next("EBD9E633-EF6E-468D-BD0A-E9183B615EA7");
  }

  public setToken(t: string) {
    this.localStorage.setItem('token', t);
    this.token.next(t);
  }

  public refresh() {
    this.token.next(this.localStorage.getItem('token'));
  }

}
