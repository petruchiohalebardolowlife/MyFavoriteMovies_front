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
import { useApolloClient } from "@apollo/client";
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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isInitialized, setIsInitialized] = useState(false);
  const { currentUser, loading, error, refetch } = useGetUser(!token);
  const signIn = useSignIn();
  const signOut = useSignOut();
  const client = useApolloClient();

  useEffect(() => {
    if (!token) {
      setIsInitialized(true);
      return;
    }

    if (!loading && !error && currentUser) {
      setUser(currentUser);
      setIsInitialized(true);
    } else if (error) {
      setIsInitialized(true);
    }
  }, [currentUser, error, loading, token]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data: { signIn: response } = {} } = await signIn({
        variables: { username, password },
      });
      const token = response.token;
      if (!token) {
        return false;
      }
      localStorage.setItem("token", token);
      setToken(token);
      await refetch();
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      const { data } = await signOut();
      if (data?.logOut) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        client.resetStore();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, loading }}>
      {isInitialized ? children : null}
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
