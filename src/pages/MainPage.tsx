import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem("username");
    if (!userSession) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
}

export default MainPage;
