import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'movie-catalog-admin';

  isSidebarOpen: boolean = true;
  isUserMenuOpen: boolean = false;
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isAuthtenticated: boolean = false;
  user = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    route: ActivatedRoute
  ) {
    this.subscribeToRouterEvents();
  }

  ngOnInit() {
    //Remove user if token is not valid
    this.authService.isTokenDataValid();

    this.getUser(this.user);
  }

  private subscribeToRouterEvents() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.urlAfterRedirects === '/login';
        this.isRegisterPage = event.urlAfterRedirects === '/register';
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }
  // Login Part

  //Chatgpt says there is a better way to do it instead with ngDoCheck
  ngDoCheck() {
    this.isAuthtenticated = this.authService.isAuthenticated();
    // Ако потребителят е автентикиран, обновяваме данните за него
    if (this.isAuthtenticated) {
      this.getUser(this.user);
    }
  }
  onLogout() {
    this.authService.loguout();
    this.user = new User();
  }
  //Get current user
  getUser(user) {
    // Проверяваме дали има токен в localStorage
    if (this.authService.isAuthenticated()) {
      this.user.id = localStorage.getItem(this.authService.USER_ID);
      this.user.userName = localStorage.getItem(this.authService.USER_NAME);
      this.user.email = localStorage.getItem(this.authService.USER_EMAIL);
    }
  }
}
