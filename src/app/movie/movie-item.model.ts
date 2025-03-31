export class MovieItem {
    id: number = 0;
    name: string = "";
    description: string = "";
    genre: string = "";
    director: string = "";
    rating: number = 0;
    imageUrl: string = "";
    releaseDate: Date = new Date();
    movieItems: MovieItem[] = [];
}