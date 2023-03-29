import { useContext, useState } from "react";
import { createContext } from "react";

type ContextType = {
  error: string,
  setError: (error: any) => void,
}

const defaultValue = {
  error: '',
  setError: (_error: any) => {
    throw new Error('Context not initialized');
  },
}

const ErrorContext = createContext<ContextType>(defaultValue);
export const ErrorContextProvider = ({ children }: any) => {
  const [error, setError] = useState(defaultValue.error);
  return (
    <ErrorContext.Provider value={{
      error, setError: (e) => {
        if (e) {
          console.error('AppError', error);
          if (e.errors) {
            const errors = e.errors.reduce((acc: any, error: any) => {
              return acc += error.message + '; ';
            }, '');

            setError(errors);
            return;
          }
        }

        setError(e);
      }
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);