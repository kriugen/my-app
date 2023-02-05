import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";

type ContextType = {
    error: string,
    setError: (error: string) => void,
}

const defaultValue = {
    error: '',
    setError: (_error: string) => {
        throw new Error('Context not initialized');
    },
}

const ErrorContext = createContext<ContextType>(defaultValue);
export const ErrorContextProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState(defaultValue.error);
  return (
    <ErrorContext.Provider value={{ error, setError: (error) => {
      // TODO parse error
      const errors = e.errors.reduce((acc: any, error: any) => {
        return acc += error.message; 
      }, '');

      if (error) 
        console.error('AppError', error);
      setError(error);
    }}}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);