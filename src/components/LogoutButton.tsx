import { useNavigate } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";

function LogoutButton() {
  const navigate = useNavigate();
  const { t } = useLingui()
  const handleClick = () => {
    sessionStorage.removeItem("authToken");
    navigate("/signin");
  };
  return (
    <button
      onClick={handleClick}
      className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400 "
    >
      {t`Logout`}
    </button>
  );
}

export default LogoutButton;
