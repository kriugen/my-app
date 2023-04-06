import { Alert } from "@mui/lab";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useErrorContext } from "./ErrorContextProvider";
import { useLoadingContext } from "./LoadingContextProvider";

const ErrorAlert = () => {
  const router = useRouter();
  const { error, setError } = useErrorContext();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    if (error)
      setLoading(false);
  }, [error, setLoading]);

  useEffect(() => {
    const handleRouteChange = (_url: any) => {
      setError('');
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    };
  }, [router.events, setError]);

  return error ? <Alert data-test='error-alert' severity='error'>{error}</Alert> : null;
}

export default ErrorAlert;