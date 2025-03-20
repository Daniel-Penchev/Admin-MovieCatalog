import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './auth/no-auth.guard';

const routes: Routes = [
  { path: '', component:DashboardComponent, canActivate: [AuthGuard]},
  { path: 'movie', component:MovieComponent, canActivate: [AuthGuard]},
  { path: 'genres', component:GenresComponent, canActivate: [AuthGuard]},
  // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login', component:LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component:RegisterComponent},
  // { path: 'register', component:RegisterComponent, outlet: 'register' },
  { path: 'not-found', component: PageNotFoundComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
