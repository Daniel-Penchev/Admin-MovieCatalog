import { MovieItem } from "./movie-item.model";

export class MovieModel {
    search: string = "";
    movieItem: MovieItem = new MovieItem();
    movieItems: MovieItem[] = [];
}