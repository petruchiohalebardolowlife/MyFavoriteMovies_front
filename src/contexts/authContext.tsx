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

interface AuthContextType {
  user: User | null;
  logout: () => void;
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
  const [isInitialized, setIsInitialized] = useState(false);
  const { currentUser, isLoadingGetUser, errorGetUser, refetchGetUser } =
    useGetUser();
  const signIn = useSignIn();
  const client = useApolloClient();
  // const data = useRefreshToken();

  // useEffect(() => {
  //   console.log("NEW TOKEN ",data);
  // }, [data]);

  useEffect(() => {
    if (!isLoadingGetUser && !errorGetUser && currentUser) {
      setUser(currentUser);
      setIsInitialized(true);
    } else if (errorGetUser) {
      setIsInitialized(true);
    }
  }, [currentUser, errorGetUser, isLoadingGetUser]);

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
      await refetchGetUser();
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    client.resetStore();
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, logout, login, loading: isLoadingGetUser }}
    >
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
