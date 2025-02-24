import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function withAuth(WrappedComponent: React.ComponentType<object>) {
  return function WithAuthComponent(props: object) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const userSession = sessionStorage.getItem("username");
      if (!userSession) {
        navigate("/signin");
      } else {
        setLoading(false);
      }
    }, [navigate]);

    if (loading) {
      return <p className="flex flex-col items-center justify-center min-h-screen">Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
}

