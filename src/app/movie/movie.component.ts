import { Component } from '@angular/core';
import { MovieModel } from './movie-model.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieItem } from './movie-item.model';
import { MovieService } from './movie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MovieResult } from './movie-result.model';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  model: MovieModel = new MovieModel();

  ngOnInit() {
    this.getAllMovies();
  }

  // onGetMoviesModel()
  getAllMovies() {
    this.movieService.getMovies().subscribe((result: MovieModel) => {
      this.model = result;
    });
  }
  onAddNew() {
    this.router.navigate(['/movie-detail/0']);
  }
  onEdit(id: number) {
    this.router.navigate(['/movie-detail/' + id]);
  }
  onDelete(item: MovieItem) {
    this.movieService.onDeleteMovie(item).subscribe((result: MovieResult) => {
      if (!result.errorMessage) {
        this.toastr.success(result.successMessage, 'Success message!');
      } else {
        this.toastr.error(result.errorMessage, 'Error message!');
      }
      this.getAllMovies();
    });
  }
}
