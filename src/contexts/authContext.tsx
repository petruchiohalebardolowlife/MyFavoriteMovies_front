import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSignIn } from "@gqlHooks/useSignIn";
import { User } from "@gqlHooks/useSignIn";
import useGetUser from "@gqlHooks/useGetUser";
import { useSignOut } from "@gqlHooks/useSignOut";

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
  const [user, setUser] = useState<User | null>(null);
  const { currentUser, loading, error } = useGetUser(
    !localStorage.getItem("token")
  );
  const login = useSignIn();
  const logout = useSignOut(setUser);

  console.log("Loading in auth context is (1)", loading);
  console.log("User in auth context is (2)", currentUser);

  useEffect(() => {
    if (!loading && !error && currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, error, loading]);

  return (
    <AuthContext.Provider value={{ user, logout, login, loading }}>
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
