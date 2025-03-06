import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CREDENTIALS } from "./services/auth";

interface AuthContextType {
  user: { username: string } | null;
  logout: () => void;
  login: (username: string) => void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setUser({ username: CREDENTIALS.username });
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    sessionStorage.setItem("authToken", "some-token");
    setUser({ username });
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
  };

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
