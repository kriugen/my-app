import { useContext, useState } from "react";
import { createContext } from "react";

type ContextType = {
  error: string | null,
  setError: (error: any) => void,
}

const defaultValue = {
  error: null,
  setError: (_error: any) => {
    throw new Error('Context not initialized');
  },
}

const ErrorContext = createContext<ContextType>(defaultValue);
export const ErrorContextProvider = ({ children }: any) => {
  const [error, setError] = useState<string | null>(defaultValue.error);
  return (
    <ErrorContext.Provider value={{
      error, setError: (e) => {
        if (!e) {
          setError(null);
          return;
        }

        console.error('AppError', e);
        if (e.errors) {
          const errors = e.errors.reduce((acc: any, error: any) => {
            return acc += error.message + '; ';
          }, '');

          setError(errors);
          return;
        }

        if (e.message) {
          setError(e.message);
        } else {
          try {
            const message = JSON.stringify(e);
            setError(message);
          } catch (e) {
            setError('Can\' extract error message, refer to console logs for AppError');
          }
        }
      }
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);