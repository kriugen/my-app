import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import ForgotPassword from "./ForgotPasswordForm";
import { ReactNode } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useErrorContext } from "src/components/ErrorContextProvider";

function ForgotPasswordPage() {
  const router = useRouter();
  const {setError} = useErrorContext();
  
  const onSubmit = async ({ username }: any) => {
    try {
      await Auth.forgotPassword(username);
      router.push({ 
        pathname: '/password/reset',
        query: { username: encodeURIComponent(username), },
      });
    } catch (e: any) {
        setError(e.message);
      }
  };

  return <ForgotPassword onSubmit={onSubmit} />;
}

ForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPasswordPage;