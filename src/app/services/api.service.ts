import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../model/todo-model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private uri: string =
    'https://65b7d94846324d531d55a322.mockapi.io/api/to-do/list';

  getAllData(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.uri);
  }
}
