import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { MovieModel } from './movie-model.model';
import { MovieItem } from './movie-item.model';
import { MovieResult } from './movie-result.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getMovies(): Observable<MovieModel> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
      'Content-Type': 'application/json',
    });
    return this.http.get<MovieModel>(
      this.auth.BASE_URL + 'api/movie/getmovies',
      { headers }
    );
  }

  onDeleteMovie(item: MovieItem): Observable<MovieResult> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    return this.http.post<MovieResult>(
      this.auth.BASE_URL + 'api/movie/deletemovie',
      item,
      { headers }
    );
  }
}
