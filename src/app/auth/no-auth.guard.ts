import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Трябва да имаш AuthService, който следи състоянието на автентикация

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Ако потребителят е автентикиран, пренасочваме към Dashboard или друга защитена страница
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}