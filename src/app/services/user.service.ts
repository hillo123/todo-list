import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UserData: any;
  constructor(
    private auth: Auth,
    private router: Router,
    public ngZone: NgZone
  ) {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  //  fetch the  User
  //  fetch  the Authenticated
  getAuthFire() {
    return this.auth.currentUser;
  }

  //  fetch Authenticated USER -> Local Storage
  getAuthLocal() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user;
  }

  //check if use is logged
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  //Sign Up User
  Register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise, but this function is disable*/
          this.sendEmailVerification();
          this.router.navigate(['/todolist']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Sign in User
  Login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/todolist']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Loging OUT
  Logout() {
    signOut(this.auth).then(() => this.router.navigate(['/signin']));
  }

  //Sign in with google
  GoogleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }

  //Pop Up Provider // TODO FIX THE CORS THAT CLOSE THE POPUP
  loginWithPopup(provider: any) {
    return signInWithPopup(this.auth, provider).then(() => {
      this.router.navigate(['/todolist']);
    });
  }

  //Send Email Verification
  sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser as User);
  }
}
