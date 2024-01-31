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
    public popupService: PopupService,
    private router: Router
  ) {}

  newTaskEdited: string = '';

  editTask() {
    this.apiService
      .modifyTask(this.popupService.dataId, this.newTaskEdited)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.apiService.getAllData();
          this.popupService.closePopup();
        },
      });
  }
}
