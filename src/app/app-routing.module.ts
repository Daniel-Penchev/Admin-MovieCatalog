import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component:DashboardComponent},
  { path: 'movie', component:MovieComponent},
  { path: 'genres', component:GenresComponent},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', component:RegisterComponent},
  // { path: 'register', component:RegisterComponent, outlet: 'register' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
