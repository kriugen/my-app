import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import SignUpForm from "./SignUpForm";
import { useErrorContext } from "../ErrorContextProvider";
import { useLoadingContext } from "../LoadingContextProvider";

function SignUpFormContainer() {
  const router = useRouter();
  const { setError } = useErrorContext();
  const { setLoading } = useLoadingContext();

  const onSubmit = async ({ username, email, password }: any) => {
    try {
      setLoading(true);
      await Auth.signUp({username, password, attributes: { email }});
      router.push('/signup/confirm');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
}

export default SignUpFormContainer;