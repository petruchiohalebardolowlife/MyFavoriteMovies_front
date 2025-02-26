import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";

export function withAuth(WrappedComponent: React.ComponentType<object>) {
  return function WithAuthComponent(props: object) {
    const { t } = useLingui()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const userSession = sessionStorage.getItem("authToken");
      if (!userSession) {
        navigate("/signin");
      } else {
        setLoading(false);
      }
    }, [navigate]);

    if (loading) {
      return (
        <p className="flex flex-col items-center justify-center min-h-screen">
         {t`Loading...`}
        </p>
      );
    }

    return <WrappedComponent {...props} />;
  };
}