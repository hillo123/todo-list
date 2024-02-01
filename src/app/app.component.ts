import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputText = '';

  constructor(
    public apiService: ApiService,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.popupService.isOpen$.subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.apiService.getAllData().subscribe({
      next: (data) => {
        this.apiService.dataTask = data;
      },
      error: (e) => console.error(e),
    });
  }

  deleteTaskBtn(id: number) {
    console.log(id);
    this.apiService.deleteTask(id).subscribe({
      next: (resp) => {
        this.fetchData();
      },
      error: (e) => console.error(e),
    });
  }

  newTaskBtn(inputText: string) {
    this.inputText = '';
    console.log(inputText);
    this.apiService.addTask(inputText).subscribe({
      next: (resp) => {
        this.fetchData();
      },
      error: (e) => console.error(e),
    });
  }
}
