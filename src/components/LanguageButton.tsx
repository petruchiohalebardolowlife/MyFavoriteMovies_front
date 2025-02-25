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
    <button onClick={handleClick} className="btn">
      {locale}
    </button>
  );
}

export default LanguageButton;
