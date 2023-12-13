import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginModel,
  LoginModelResponse,
} from 'src/app/shared/models/login.model';
import {
  RegisterModel,
  RegisterModelResponse,
} from 'src/app/shared/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api/user/';

  constructor(private http: HttpClient) {}

  login(data: LoginModel): Observable<LoginModelResponse> {
    return this.http.post<LoginModelResponse>(this.url + 'auth', data);
  }

  register(data: RegisterModel): Observable<RegisterModelResponse> {
    return this.http.post<RegisterModelResponse>(this.url + 'create', data);
  }
}
