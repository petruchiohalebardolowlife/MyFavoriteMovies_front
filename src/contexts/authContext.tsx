import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSignIn } from "@gqlHooks/useSignIn";
import { User } from "@gqlHooks/useSignIn";
import { useGetUser } from "@gqlHooks/useGetUser";

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
  const { currentUser, loading, error: getUserError } = useGetUser();
  const { signIn, loading: signInLoading, error: signInError } = useSignIn();

  useEffect(() => {
    if (!loading && !currentUser.id) {
      setUser(null);
    } else if (!loading) {
      setUser(currentUser);
    }
  }, [loading]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await signIn({ variables: { username, password } });
      if (data?.signIn.user) {
        setUser(data.signIn.user);
        localStorage.setItem("token", data.signIn.token);
        return true;
      }
    } catch (err) {
      console.error("Login error:", err);
    }
    return false;
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

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useSignIn } from "@gqlHooks/useSignIn";
// import { User } from "@gqlHooks/useSignIn";
// import { useGetUser } from "@gqlHooks/useGetUser";

// interface AuthContextType {
//   user: User | null;
//   logout: () => void;
//   login: (variables: { username: string; password: string }) => Promise<boolean>;
//   loading: boolean;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const { currentUser, loading: getUserLoading, refetchGetUser } = useGetUser();
//   const { signIn, token, loading: signInLoading } = useSignIn();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       refetchGetUser();
//     }
//   }, [refetchGetUser]);

//   useEffect(() => {
//     if (!getUserLoading && currentUser.id) {
//       setUser(currentUser);
//     }
//   }, [currentUser, getUserLoading]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const login = async ({ username, password }: { username: string; password: string }) => {
//     try {
//       const { data } = await signIn({ variables: { username, password } });
//       if (data?.signIn.user) {
//         setUser(data.signIn.user);
//         localStorage.setItem("token", data.signIn.token);
//         return true;
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//     return false;
//   };

//   const loading = signInLoading || getUserLoading;

//   return (
//     <AuthContext.Provider value={{ user, logout, login, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth() must be used within an AuthProvider");
//   }
//   return context;
// }

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useSignIn } from "@gqlHooks/useSignIn";
// import { User } from "@gqlHooks/useSignIn";
// import { useGetUser } from "@gqlHooks/useGetUser";

// interface AuthContextType {
//   user: User | null;
//   logout: () => void;
//   login: (variables: { username: string; password: string }) => Promise<boolean>;
//   loading: boolean;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const { currentUser, loading: getUserLoading, refetchGetUser } = useGetUser();
//   const { signIn, token, loading: signInLoading } = useSignIn();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       refetchGetUser().catch(console.error);
//     }
//   }, []);
//   useEffect(() => {
//     if (!getUserLoading && currentUser?.id) {
//       setUser(currentUser);
//     }
//   }, [currentUser, getUserLoading]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const login = async ({ username, password }: { username: string; password: string }) => {
//     try {
//       const { data } = await signIn({ variables: { username, password } });
//       if (data?.signIn.user) {
//         setUser(data.signIn.user);
//         localStorage.setItem("token", data.signIn.token);
//         return true;
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//     return false;
//   };

//   // const loading = signInLoading || getUserLoading;
//   const loading = getUserLoading

//   return (
//     <AuthContext.Provider value={{ user, logout, login, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth() must be used within an AuthProvider");
//   }
//   return context;
// }
