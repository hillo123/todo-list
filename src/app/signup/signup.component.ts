import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email?: string;
  password?: string;
  confirmPassword?: string;

  constructor(public userService: UserService) {}

  signUp() {
    const user = { email: this.email, password: this.password };
    this.userService.addNewUser(user).subscribe((data) => {
      console.log(data);
    });
  }
}
