import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TodoModel } from '../model/todo-model';

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
    return this.http
      .get<TodoModel[]>(this.API_MOCK_ENDPOINT)
      .pipe(catchError(this.handleError));
  }

  // route to delete one task
  deleteTask(id: number): Observable<any> {
    return this.http
      .delete(`${this.API_MOCK_ENDPOINT}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // route to create new task
  addTask(data: string) {
    console.log(data);
    const body = { task: data };
    return this.http
      .post(`${this.API_MOCK_ENDPOINT}`, body)
      .pipe(catchError(this.handleError));
  }

  // route to modify one task
  modifyTask(id: number, data: string): Observable<any> {
    const body = { task: data };
    return this.http
      .put<TodoModel>(`${this.API_MOCK_ENDPOINT}/${id}`, body)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('we have an error', error.error);
    } else {
      console.error('Backend return an error', error.status, error.error);
    }
    return throwError(() => new Error('Try again'));
  }
}
