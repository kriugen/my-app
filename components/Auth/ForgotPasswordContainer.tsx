import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import ForgotPassword from "./ForgotPassword";
import { useErrorContext } from "../ErrorContextProvider";

function ForgotPasswordContainer() {
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

export default ForgotPasswordContainer;