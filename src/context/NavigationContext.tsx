
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  currentFunction: string | null;
  setCurrentFunction: (func: string | null) => void;
  isInFunction: boolean;
  functionName: string | null;
  goHome: () => void;
  goToFunction: (functionName: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFunction, setCurrentFunction] = useState<string | null>(null);

  const goHome = () => {
    setCurrentFunction(null);
  };

  const goToFunction = (functionName: string) => {
    setCurrentFunction(functionName);
  };

  const value = {
    currentFunction,
    setCurrentFunction,
    isInFunction: currentFunction !== null,
    functionName: currentFunction,
    goHome,
    goToFunction,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
