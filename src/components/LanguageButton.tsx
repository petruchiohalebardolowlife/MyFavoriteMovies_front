interface LanguageButtonProps {
  locale: string;
  changeLanguage: (locale: string) => void;
}

function LanguageButton({ locale, changeLanguage }: LanguageButtonProps) {
  const handleClick = () => {
    localStorage.setItem("language", locale);
    changeLanguage(locale);
  };
  return (
    <button onClick={handleClick} className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400">
      {locale}
    </button>
  );
}

export default LanguageButton;
