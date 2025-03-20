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
  const { dataGetUser, isLoadingGetUser, errorGetUser, refetchGetUser } =
    useGetUser();
  const { signIn } = useSignIn();
  const client = useApolloClient();

  useEffect(() => {
    if (!isLoadingGetUser && !errorGetUser && dataGetUser) {
      setUser({
        id: dataGetUser.getUser.id,
        userName: dataGetUser.getUser.userName,
        nickName: dataGetUser.nickName,
      });
      setIsInitialized(true);
    } else if (errorGetUser) {
      setIsInitialized(true);
    }
  }, [dataGetUser, errorGetUser, isLoadingGetUser]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const responseSignIn = await signIn({
        variables: { username, password },
      });
      const token = responseSignIn.data?.signIn?.token;
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
    client.clearStore();
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
