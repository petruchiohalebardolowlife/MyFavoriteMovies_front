import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

export function withAuth(WrappedComponent: React.ComponentType<object>) {
  return function WithAuthComponent(props: object) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const userSession = sessionStorage.getItem("authToken");
      if (!userSession) {
        <Navigate to="/signin"/>;
      } else {
        setLoading(false);
      }
    }, );

    if (loading) {
      return (
        <p className="flex flex-col items-center justify-center min-h-screen">
          <Trans>Loading...</Trans>
        </p>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
