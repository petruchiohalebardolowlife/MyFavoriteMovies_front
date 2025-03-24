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

    console.log("Loading in HOC is (3)", loading);
    console.log("User in HOC is (4)", user);

    React.useEffect(() => {
      if (!loading && !user) {
        navigate("/signin");
        console.log("Navigate from here");
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
