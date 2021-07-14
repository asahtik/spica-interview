import { InjectionToken } from '@angular/core';

export const TOKEN_STORAGE = new InjectionToken<Storage>(
  'Token',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);
