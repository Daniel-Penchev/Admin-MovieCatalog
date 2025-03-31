import { MovieItem } from "../movie/movie-item.model";

export class MovieDetailModel {
    successMessage: string;
    errorMessage: string;
    movieItem: MovieItem = new MovieItem();
}