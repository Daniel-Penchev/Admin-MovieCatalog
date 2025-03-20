import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Login } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) { }
 
  loginData = new Login();

  ngOnInit() {
   
  }
  onLogin() {
    this.auth.login(this.loginData);
    this.router.navigate(['/']);
    return false;
  }

  onErrorMessage(){
    return this.auth.errorMessage;
  }
}
