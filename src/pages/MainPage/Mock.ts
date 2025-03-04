import { Movie } from "../../services/tmdbQuery";

export const favoriteMovies: Movie[] = [
  {
    id: 2,
    title: "Interstellar",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    genreIDs: [12, 18, 878],
    releaseDate: "2014-11-07",
  },
  {
    id: 3,
    title: "The Dark Knight",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genreIDs: [28, 80, 18],
    releaseDate: "2008-07-18",
  },
  {
    id: 4,
    title: "Fight Club",
    posterPath: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    genreIDs: [18],
    releaseDate: "1999-10-15",
  },
];