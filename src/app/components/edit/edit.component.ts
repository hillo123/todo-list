import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  constructor(
    private apiService: ApiService,
    public popupService: PopupService
  ) {}

  newTaskEdited: string = '';
  invalid: boolean = true;
  //validate the input
  checkTaskInput() {
    if (this.newTaskEdited.length == 0) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }
  }
  //route to edit task - apiService
  editTask() {
    this.checkTaskInput();
    this.apiService
      .modifyTask(this.popupService.dataId, this.newTaskEdited)
      .subscribe({
        next: () => {
          this.apiService.getAllData();
          this.popupService.closePopup();
        },
      });
  }
}
