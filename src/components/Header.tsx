import LanguageButton from "./LanguageButton";
import { useAuth } from "@contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLingui();
  const handleClick = () => {
    logout();
    navigate("/signin");
  };

  return (
    <header className="p-2 bg-gray-700 text-white flex flex-row">
      <div className="ml-auto space-x-2 flex flex-row">
        <LanguageButton locale="en" />
        <LanguageButton locale="ru" />
        {user ? (
          <div className="flex flex-row">
            <p className="mx-2 my-2 font-medium">{t`Hello, ${user.userName} `}</p>
            <button
              onClick={handleClick}
              className="py-2 px-4 bg-gray-800 rounded hover:bg-gray-600"
            >
              {t`Logout`}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
