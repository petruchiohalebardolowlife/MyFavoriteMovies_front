import { createContext, useContext, ReactNode } from "react";
import { useSignIn } from "@gqlHooks/useSignIn";
import { User } from "@gqlHooks/useSignIn";
import useGetUser from "@gqlHooks/useGetUser";
import { useSignOut } from "@gqlHooks/useSignOut";
import { useLingui } from "@lingui/react/macro";

interface AuthContextType {
  user: User | null;
  logout: () => Promise<boolean>;
  login: (variables: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const { currentUser, loading, error } = useGetUser(
    !localStorage.getItem("token")
  );
  const { t } = useLingui();
  const login = useSignIn();
  const logout = useSignOut();

  if (error) {
    return (
      <p className="flex flex-col items-center justify-center min-h-screen">
        {t`Error: ${error.message}`}
      </p>
    );
  }

  return (
    <AuthContext.Provider value={{ user: currentUser, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within an AuthProvider");
  }
  return context;
}
