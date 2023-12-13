import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { DecodedToken } from 'src/app/shared/models/decodedToken.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private store: LocalStorageService) {
    this.isLogged.next(!!this.store.get('token'));
  }

  removeToken(): void {
    this.store.remove('token');
    this.isLogged.next(false);
  }

  setToken(token: string): void {
    this.store.set('token', token);
  }

  getToken(): string | null {
    return this.store.get('token');
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserId(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.userId;
    }
    return null;
  }
}
