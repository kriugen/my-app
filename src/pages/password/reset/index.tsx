import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import ResetPasswordForm from "./ResetPasswordForm";
import { useErrorContext } from "../../../components/ErrorContextProvider";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { ReactNode } from "react";

function ResetPasswordPage() {
  const router = useRouter();
  const {setError} = useErrorContext();
  const { username } = router.query;
  
  const onSubmit = async ({ username, code, password }: any) => {
    try {
      await Auth.forgotPasswordSubmit(username, code, password)
      router.push('/login');
    } catch (e: any) {
        setError(e.message);
      }
  };

  return <ResetPasswordForm username={username} onSubmit={onSubmit} />;
}

ResetPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPasswordPage;