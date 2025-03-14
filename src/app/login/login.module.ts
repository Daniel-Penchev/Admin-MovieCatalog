import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module'; // Важно!
import { IconModule  } from '@coreui/icons-angular';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule, // Зарежда маршрутизацията на този модул
    IconModule 
  ]
})
export class LoginModule { }  // 👈 Това е, което импортваме в loadChildren