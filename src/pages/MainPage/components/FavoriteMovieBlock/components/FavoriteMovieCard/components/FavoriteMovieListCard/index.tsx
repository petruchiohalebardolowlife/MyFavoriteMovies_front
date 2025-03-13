import NameOfGenres from "../../../NameOfGenres";
import { useLingui } from "@lingui/react/macro";
import { FavoriteMovieCardProps } from "../..";
import FavoriteMovieCardButtons from "../FavoriteMovieCardButtons";
import { API_PICS } from "@components/constants";

function FavoriteMovieListCard({
  favMovie,
  toggleWatchedStatus,
  handleDelete,
  genres,
  number,
}: FavoriteMovieCardProps) {
  const { t } = useLingui();

  return (
    <div
      className={`${
        favMovie.watchedStatus ? "grayscale opacity-50" : ""
      } flex flex-row items-center gap-4 justify-between border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <p className="break-words overflow-hidden">{favMovie.title}</p>
      <img
        className="my-2 max-h-64"
        alt={t`poster of ${favMovie.title}`}
        src={API_PICS + favMovie.posterPath}
      />
      <span>
        {t`Primary release year: ${favMovie.releaseDate.slice(0, 4)}`}
      </span>
      <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
      <div className="flex flex-row gap-2">
        <FavoriteMovieCardButtons
          toggleWatchedStatus={toggleWatchedStatus}
          handleDelete={handleDelete}
          movieid={favMovie.id}
        />
      </div>
    </div>
  );
}

export default FavoriteMovieListCard;

// import NameOfGenres from "../../../NameOfGenres";
// import { useLingui } from "@lingui/react/macro";
// import { FavoriteMovieCardProps } from "../..";
// import FavoriteMovieCardButtons from "../FavoriteMovieCardButtons";
// import { API_PICS } from "@components/constants";
// import { Movie } from "@services/tmdbQuery";
// import { ReactNode } from "react";

// interface MovieListCardProps extends FavoriteMovieCardProps {
//   renderActions: (movie: Movie) => ReactNode;
// }

// function MovieListCard({
//   movie,
//   genres,
//   number,
//   renderActions,
// }: MovieListCardProps) {
//   const { t } = useLingui();

//   return (
//     <div
//       className={`${
//         favMovie.watchedStatus ? "grayscale opacity-50" : ""
//       } flex flex-row items-center gap-4 justify-between border border-gray-400 rounded-lg bg-gray-100 px-2`}
//     >
//       <span>{number}</span>
//       <p className="break-words overflow-hidden">{favMovie.title}</p>
//       <img
//         className="my-2 max-h-64"
//         alt={t`poster of ${movie.title}`}
//         src={API_PICS + movie.p}
//       />
//       <span>
//         {t`Primary release year: ${favMovie.releaseDate.slice(0, 4)}`}
//       </span>
//       <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
//       <div className="flex flex-row gap-2">
//         {renderActions(movie)}
//       </div>
//     </div>
//   );
// }

// export default MovieListCard;
