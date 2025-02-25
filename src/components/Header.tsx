interface HeaderProps {
  changeLanguage: (locale: string) => void;
}

function Header({ changeLanguage }: HeaderProps) {
  const handleChangeLanguage = (locale: string) => {
    localStorage.setItem("language", locale);
    changeLanguage(locale);
  };
  return (
    <header className="p-2 bg-gray-700 text-white flex justify-between items-center">
      <div className="ml-auto space-x-2">
        <button
          onClick={() => handleChangeLanguage("en")}
          className="py-2 px-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
        >
          En
        </button>
        <button
          onClick={() => handleChangeLanguage("ru")}
          className="py-2 px-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
        >
          Ru
        </button>
      </div>
    </header>
  );
};

export default Header;
