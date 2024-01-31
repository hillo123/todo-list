import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { TodoModel } from './model/todo-model';
import { PopupService } from './services/popup.service';
import { BehaviorSubject, Subscription, toArray } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  inputText = '';

  constructor(
    public apiService: ApiService,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.popupService.isOpen$.subscribe((nuevoValor) => {
      this.fetchData();
    });
  }

  ngOnDestroy() {
    console.log('enb destroy');
  }

  fetchData() {
    this.apiService.getAllData().subscribe({
      next: (data) => {
        this.apiService.dataTask = data;
        console.log('fetch data');
        //TODO handle errors
      },
    });
  }

  deleteTaskBtn(id: number) {
    console.log(id);
    this.apiService.deleteTask(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.fetchData();
        //TODO handle errors
      },
    });
  }

  newTaskBtn(inputText: string) {
    this.inputText = '';
    console.log(inputText);
    this.apiService.addTask(inputText).subscribe({
      next: (resp) => {
        console.log(resp);
        this.fetchData();
        //TODO handle errors
      },
    });
  }
}
