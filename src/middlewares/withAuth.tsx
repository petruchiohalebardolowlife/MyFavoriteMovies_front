import React from "react";
import { useNavigate } from "react-router-dom";
import { useLingui } from "@lingui/react/macro";
import { useAuth } from "@contexts/authContext";

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithAuthComponent(props: T) {
    const { t } = useLingui();
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    React.useEffect(() => {
      if (!loading && !user) {
        console.log(user);
        navigate("/signin");
      }
    }, [loading, user, navigate]);

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