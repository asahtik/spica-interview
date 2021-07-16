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
  }

  public setToken(t: string) {
    this.localStorage.setItem('token', t);
    this.token.next(t);
  }

  public refresh() {
    this.token.next(this.localStorage.getItem('token'));
  }

}
