import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PopupService } from '../../services/popup.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  inputText = '';
  tagList: string[] = ['prioritario', 'normal'];
  tagSelected: string = 'normal';
  invalid: boolean = true;

  constructor(
    public apiService: ApiService,
    public popupService: PopupService,
    public authService: UserService
  ) {}

  ngOnInit(): void {
    this.popupService.isOpen$.subscribe(() => {
      this.fetchData();
    });
  }

  //check the length input
  checkTaskInput() {
    if (this.inputText.length == 0) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }
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
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.fetchData();
      },
      error: (e) => console.error(e),
    });
  }

  newTaskBtn(inputText: string, tag: string) {
    this.inputText = '';
    this.invalid = true;
    this.apiService.addTask(inputText, tag).subscribe({
      next: () => {
        this.fetchData();
      },
      error: (e) => console.error(e),
    });
  }
}
