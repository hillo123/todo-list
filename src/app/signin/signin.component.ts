import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  email?: string;
  password?: string;

  constructor(public userService: UserService) {}

  signInUser() {
    const user = { email: this.email, password: this.password };
    this.userService.fetchUser(user).subscribe((data) => {
      console.log(data);
    });
  }
}
