'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface NavMenuContextValue {
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

export function NavMenuProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const value = useMemo(() => ({ isNavOpen, setIsNavOpen }), [isNavOpen]);
  return <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>;
}

export function useNavMenu() {
  const ctx = useContext(NavMenuContext);
  if (!ctx) throw new Error('useNavMenu must be used within NavMenuProvider');
  return ctx;
}
