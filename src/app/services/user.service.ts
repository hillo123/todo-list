import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  fetchUser(user: any): Observable<any> {
    return this.httpClient.post('https://reqres.in/api/login', user);
  }

  addNewUser(user: any): Observable<any> {
    return this.httpClient.post('https://reqres.in/api/register', user);
  }
}
