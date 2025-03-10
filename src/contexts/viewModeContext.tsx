import { useContext, createContext, useState } from "react";
import { ReactNode } from "react";

interface ViewModeContextType {
  viewMode: "list" | "grid";
  setViewMode: (viewMode: "list" | "grid") => void;
}

interface ViewModeProviderProps {
  children: ReactNode;
}

const viewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

export function ViewModeProvider({ children }: ViewModeProviderProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  return (
    <viewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </viewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(viewModeContext);
  if (!context) {
    throw new Error("useViewMode() must be used within an AuthProvider");
  }
  return context;
}
