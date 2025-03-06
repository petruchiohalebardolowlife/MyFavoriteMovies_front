import { useNavigate } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";
import { CREDENTIALS } from "../../services/auth";

function Logout() {
  const navigate = useNavigate();
  const { t } = useLingui();
  const handleClick = () => {
    sessionStorage.removeItem("authToken");
    navigate("/signin");
  };
  return (
    <div className="flex flex-row-reverse my-1 p-2 max-w">
      <button
        onClick={handleClick}
        className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"
      >
        {t`Logout`}
      </button>
      <p className="mx-2 my-2 font-medium">{t`Hello, ${CREDENTIALS.username}`}</p>
    </div>
  );
}

export default Logout;
