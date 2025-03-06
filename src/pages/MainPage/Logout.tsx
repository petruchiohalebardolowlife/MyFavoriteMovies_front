import { useNavigate } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";
import { useAuth } from "../../authContext";

function Logout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLingui();
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
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
      <p className="mx-2 my-2 font-medium">{t`Hello, ${user?.username}`}</p>
    </div>
  );
}

export default Logout;
