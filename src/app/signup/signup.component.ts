import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email?: string;
  password?: string;
  confirmPassword?: string;

  constructor() {}

  signUp() {
    console.log(this.email);
    console.log(this.password);
  }
}
