import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  user: { username: string } | null;
  logout: () => void;
  login: (username: string, password: string) => boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}
const hardcodedUser = {
  username: "username",
  password: "password",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setUser({ username: hardcodedUser.username });
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    if (
      username == hardcodedUser.username &&
      password == hardcodedUser.password
    ) {
      sessionStorage.setItem("authToken", "some-token");
      setUser({ username: hardcodedUser.username });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setUser(null);
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
