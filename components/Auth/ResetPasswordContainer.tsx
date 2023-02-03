import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import ResetPassword from "./ResetPassword";
import { useErrorContext } from "../ErrorContextProvider";

function ResetPasswordContainer() {
  const router = useRouter();
  const {setError} = useErrorContext();
  const { username } = router.query;
  
  const onSubmit = async ({ username, code, password }: any) => {
    try {
      await Auth.forgotPasswordSubmit(username, code, password)
      router.push('/signin');
    } catch (e: any) {
        setError(e.message);
      }
  };

  return <ResetPassword username={username} onSubmit={onSubmit} />;
}

export default ResetPasswordContainer;