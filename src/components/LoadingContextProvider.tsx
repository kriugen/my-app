import { Box, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";

type ContextType = {
    loading: boolean,
    setLoading: (loading: boolean) => void,
}

const defaultValue = {
    loading: false,
    setLoading: (_loading: boolean) => {
        throw new Error('Context not initialized');
    },
}

const LoadingContext = createContext<ContextType>(defaultValue);
export const LoadingContextProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(defaultValue.loading);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(
        `App is changing to ${url}`
      )
      setLoading(false);
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      { loading && <LinearProgress /> }
      <Box sx={loading ? { pointerEvents: "none", opacity: "0.6" } : null}>
        {children}
      </Box>
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);