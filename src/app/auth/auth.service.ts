import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //https://localhost:7068
  TOKEN_KEY = 'token';

  BASE_URL = 'https://localhost:7068/';

  VALID_TO = 'validTo';

  USER_ID = 'userId';

  USER_NAME = 'userName';

  USER_EMAIL = 'email';

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData) {
    return this.http
      .post(this.BASE_URL + 'account/GenerateToken', loginData)
      .subscribe(
        (res) => {
          this.authenticate(res);
          console.log("token res:",res);
          
        },
        (err) => {
          if (err.status == 0) {
            this.errorMessage = 'Server error.';
          }
          if (err.status === 400) {
            this.errorMessage = 'Please check you user name or password.';
          } else {
            this.errorMessage = err._body;
          }
        }
      );
  }
  authenticate(res) {
    this.errorMessage = '';

    //HttpClient автоматично връща JSON обект.
    // const authResponce = res.json();

    const authResponce = res;
    
    if (authResponce !== null && authResponce.token) {
      localStorage.setItem(this.TOKEN_KEY, authResponce.token);

      localStorage.setItem(this.VALID_TO, authResponce.validTo);

      localStorage.setItem(this.USER_ID, authResponce.user.id);

      localStorage.setItem(this.USER_NAME, authResponce.user.userName);

      localStorage.setItem(this.USER_EMAIL, authResponce.user.email);

      this.router.navigate(['/']);
    }
  }
  loguout() {
    localStorage.removeItem(this.TOKEN_KEY);

    localStorage.removeItem(this.VALID_TO);

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return localStorage.getItem(this.TOKEN_KEY) != null ? true : false;
  }
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isTokenDataValid() {
    var dateNow = new Date();

    var validToData = new Date(localStorage.getItem(this.VALID_TO));

    if (validToData < dateNow) {
      localStorage.removeItem(this.TOKEN_KEY);

      localStorage.removeItem(this.VALID_TO);
    }
  }
}
