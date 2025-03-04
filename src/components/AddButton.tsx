import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";

function AddButton() {
  const { t } = useLingui()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/searchmovies")
  };
  return (
    <button
      onClick={handleClick}
      className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"
    >
      {t`Add movie`}
    </button>
  );
}

export default AddButton