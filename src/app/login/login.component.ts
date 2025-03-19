import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private auth: AuthService) { }
 
  loginData = new Login();

  ngOnInit() {
   
  }
  onLogin() {
    this.auth.login(this.loginData);

    return false;
  }

  onErrorMessage(){
    return this.auth.errorMessage;
  }
}
