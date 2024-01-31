import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PopupService {
  dataId: number = 0;
  dataTask: string = '';
  isOpenPopup = new BehaviorSubject<boolean>(false);
  //observers to  use it in main component to know  when should be open or close the Popup
  isOpen$ = this.isOpenPopup.asObservable();

  //this the logic to edit a task
  openPopup(id: number, dataTask: string) {
    this.dataId = id;
    this.dataTask = dataTask;
    this.isOpenPopup.next(true);
  }

  closePopup() {
    this.isOpenPopup.next(false);
  }
}
