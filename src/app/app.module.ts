import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieComponent } from './movie/movie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FilterNamePipe } from './pipes/filter-name.pipe';
@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    DashboardComponent,
    GenresComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    MovieDetailComponent,
    FilterNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      //positionClass: 'toast-bottom-right', // Позициониране на съобщението долу вдясно
      preventDuplicates: true, // За да не се показват дублиращи се съобщения
      closeButton: true, // За да можеш да затвориш съобщението с бутон
      timeOut: 3000, // Времето за изчезване на съобщението
    }),
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
