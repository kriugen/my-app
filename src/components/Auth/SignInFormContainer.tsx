import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import SignInForm from "./SignInForm";
import { useErrorContext } from "../ErrorContextProvider";
import { useLoadingContext } from "../LoadingContextProvider";

function SignInFormContainer({ referer }: any) {
  const router = useRouter();
  const {setError} = useErrorContext();
  const { loading, setLoading } = useLoadingContext();
  
  const onSubmit = async ({ username, password }: any) => {
    try {
      setLoading(true);
      await Auth.signIn(username, password);
      if (referer) {
        router.back();
      } else {
        router.push('/');
      }
    } catch (e: any) {
        if (e.code == 'UserNotConfirmedException') {
          router.push({ 
              pathname: '/signup/confirm',
              query: { username: encodeURIComponent(username), },
          });
        } else {
          setError(e.message);
        }
      }
  };

  return <SignInForm onSubmit={onSubmit} loading={loading} />;
}

export default SignInFormContainer;