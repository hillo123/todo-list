import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../model/todo-model';
import { BehaviorSubject, Subscription, toArray } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public dataTask?: TodoModel[];

  constructor(private http: HttpClient) {}
  private readonly API_MOCK_ENDPOINT: string =
    'https://65b7d94846324d531d55a322.mockapi.io/api/to-do/list';

  // route to fetch entire data
  getAllData(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.API_MOCK_ENDPOINT);
  }
}
