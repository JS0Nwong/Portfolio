import { useContext, createContext, useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarContext = {
  open: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
};

const SidebarContext = createContext<SidebarContext | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);

  const contextValue = useMemo<SidebarContext>(
    () => ({
      open,
      toggleSidebar,
      isMobile,
    }),
    [open, setOpen, isMobile]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
