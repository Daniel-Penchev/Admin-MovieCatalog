import { Component } from '@angular/core';
import { MovieItem } from '../movie/movie-item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieModel } from '../movie/movie-model.model';
import { MovieService } from '../movie/movie.service';
import { ToastrService } from 'ngx-toastr';
import { MovieDetailService } from './movie-detail.service';
import { ActivatedRoute } from '@angular/router';
import { MovieResult } from '../movie/movie-result.model';
import { MovieDetailModel } from './movie-detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {

   // Variable to store shortLink from api response
   shortLink: string = '';
   loading: boolean = false; // Flag variable
   file: File = null; // Variable to store file

  constructor(private movieDetailService:MovieDetailService,private route: ActivatedRoute,private toastr: ToastrService,private datePipe: DatePipe) {}

  public id: number;
  isImageDeleted: boolean = false;
  model: MovieDetailModel = new MovieDetailModel();
  movieForm: FormGroup;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.movieForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      genre: new FormControl(null),
      director: new FormControl(null),
      rating: new FormControl(0),
      imageUrl: new FormControl(null),
      releaseDate: new FormControl(null, Validators.required),
    });

    if (this.id) {
      this.onGetMovieDetail(this.id);
    }
  }

  onSubmit(){
    //TODO: Pri submit da ne moga da dobavqm edni i sushti filmi
    let item = new MovieItem();
    item.id = this.id;
    item.name = this.movieForm.get('name').value;
    item.description = this.movieForm.get('description').value;
    item.genre = this.movieForm.get('genre').value;
    item.director = this.movieForm.get('director').value;
    item.rating = this.movieForm.get('rating').value;
    // item.imageUrl = this.movieForm.get('imageUrl').value;
    item.imageUrl = this.model.movieItem.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png';
    item.releaseDate = this.movieForm.get('releaseDate').value;
   

    if (this.isImageDeleted) {
      this.movieDetailService.onDeleteMovieImage(this.model.movieItem).subscribe(() => { /* Изпълнява се без да се прави нищо */ });
    }

    this.movieDetailService.saveMovie(item).subscribe(
      (result: MovieResult) => {
        if (!result.errorMessage) {

          this.id = result.id;

          this.toastr.success(result.successMessage, 'Success message!');
        } else {
          this.toastr.error(result.errorMessage, 'Error message!');
        }
      }
    );
  }
  onGetMovieDetail(id: number) {
    this.movieDetailService.getMovieDetail(id).subscribe(
      (result: MovieDetailModel) => {
        this.model = result;
        const releaseDate = result.movieItem.releaseDate;
        const formattedReleaseDate = this.datePipe.transform(releaseDate, 'yyyy-MM-dd');

        this.movieForm.patchValue({
          name: result.movieItem.name,
          description: result.movieItem.description,
          genre: result.movieItem.genre,
          director: result.movieItem.director,
          rating: result.movieItem.rating,
          imageUrl: result.movieItem.imageUrl,
          releaseDate: formattedReleaseDate // Format the date
        });
      }
    );
  }
  updateRating(event: Event) {
    const input = event.target as HTMLInputElement;
    this.movieForm.patchValue({ rating: input.value });
 }

 
  onDeleteImage(){
     if (this.model.movieItem.imageUrl === 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png') {
      this.toastr.error('No image to delete!', 'Error message!');
      return;
     }

     this.isImageDeleted = true;
     this.model.movieItem.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png';
     this.toastr.success('Image removed from UI. It will be deleted permanently upon saving.', 'Success message!');
  }

 onChange(event) {
  this.file = event.target.files[0];
  console.log('Избран файл:', this.file);
  this.onUpload();
}

onUpload() {
  this.loading = !this.loading;

  console.log(this.file);

  const formData = new FormData();

  formData.append('uploadimage', this.file, this.file.name);

  this.movieDetailService
    .onUploadData(this.id, formData)
    .subscribe((result: MovieResult) => {
      console.log('Резултат от качването на изображението:', result);
      console.log('Result full imageUrl', result.fullImageUrl);

      this.model.movieItem.imageUrl = result.fullImageUrl;

      // if (!result.errorMessage) {
      //   this.toastr.success(result.successMessage, 'Success message!');
      // } else {
      //   this.toastr.error(result.errorMessage, 'Error message!');
      // }
    });
}

 // ngx-dropzone methods
  // onFileSelect(event: any) {
  //   this.file = event.addedFiles ? event.addedFiles[0] : event.target.files[0];

  //   console.log('Избран файл:', this.file);

  //   if (this.file) {
  //     this.onUpload();
  //   }
  // }

  // onUpload() {
  //   this.loading = true;

  //   const formData = new FormData();
  //   formData.append('uploadimage', this.file, this.file.name);

  //   this.carService
  //     .onUploadData(+this.id, formData)
  //     .subscribe((result: CarResult) => {
  //       console.log('Резултат от качването:', result);
  //       this.model.carItem.image = result.fullImageUrl;

  //       if (!result.errorMessage) {
  //         this.toastr.success(result.successMessage, 'Success message!');
  //       } else {
  //         this.toastr.error(result.errorMessage, 'Error message!');
  //       }

  //       this.loading = false;
  //     });
  // }
}
