import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieItem } from '../movie/movie-item.model';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { MovieDetailModel } from './movie-detail.model';
import { MovieResult } from '../movie/movie-result.model';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // getMovies(): Observable<MovieModel> {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + this.auth.getToken(),
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.get<MovieModel>(this.auth.BASE_URL + 'api/movie/getmovies', { headers });
  // }

  getMovieDetail(id: number): Observable<MovieDetailModel> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    return this.http.get<MovieDetailModel>(
      this.auth.BASE_URL + 'api/movie/getmoviedetail/' + id,
      { headers }
    );
  }
  saveMovie(item: MovieItem) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    return this.http.post(this.auth.BASE_URL + 'api/movie/save', item, {
      headers,
    });
  }

  onDeleteMovieImage(item: MovieItem): Observable<MovieResult> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    return this.http
      .post<MovieResult>(
        this.auth.BASE_URL + 'api/movie/deletemovieimage/', item,
        { headers }
      )
      .pipe();
  }

  onUploadData(id: number, formData: FormData): Observable<MovieResult> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    return this.http
      .post<MovieResult>(this.auth.BASE_URL + 'api/movie/uploadimage/' + id, formData, {
        headers,
      }).pipe();
  }
}
