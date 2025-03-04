import { useLingui } from "@lingui/react/macro";
import { Genre } from "../../services/tmdbQuery";

interface GenresBlockProps {
  genres: Genre[];
  onClick: (id: number) => void;
  pressed: { [key: number]: boolean };
}

function GenresBlock({ genres, onClick, pressed }: GenresBlockProps) {
  const { t } = useLingui();
  return (
    <>
      <div className="flex justify-center content-center text-lg font-medium my-2 bg-gray p-3 bg-gray-400">{t`Select your favorite genres`}</div>
      <div className="flex flex-wrap justify-center content-center px-4 gap-2">
        {genres?.map((genre) => (
          <button onClick={() => onClick(genre.id)} key={genre.id} className={`py-2 px-4  ${pressed[genre.id] ? "bg-gray-300 hover:bg-gray-600" : "bg-gray-800"} text-white rounded hover:bg-gray-500`}>
          {genre.name}
    </button>
        ))}
      </div>
    </>
  );
}

export default GenresBlock;
