import LanguageButton from "./LanguageButton";

function Header() {
  return (
    <header className="p-2 bg-gray-700 text-white flex justify-between items-center">
      <div className="ml-auto space-x-2">
        <LanguageButton locale="en" />
        <LanguageButton locale="ru" />
      </div>
    </header>
  );
}

export default Header;
