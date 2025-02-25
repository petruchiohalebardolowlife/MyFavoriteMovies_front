import LanguageButton from "./LanguageButton";

interface HeaderProps {
  changeLanguage: (locale: string) => void;
}

function Header({ changeLanguage }: HeaderProps) {
  return (
    <header className="p-2 bg-gray-700 text-white flex justify-between items-center">
      <div className="ml-auto space-x-2">
      <LanguageButton locale="en" changeLanguage={changeLanguage} />
      <LanguageButton locale="ru" changeLanguage={changeLanguage} />
      </div>
    </header>
  );
}

export default Header
