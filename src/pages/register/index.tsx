import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import Form from "./RegisterForm";
import { ReactNode } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useErrorContext } from "src/components/ErrorContextProvider";
import { useLoadingContext } from "src/components/LoadingContextProvider";

function RegisterPage() {
  const router = useRouter();
  const { setError } = useErrorContext();
  const { setLoading } = useLoadingContext();

  const onSubmit = async ({ username, email, password }: any) => {
    try {
      setLoading(true);
      await Auth.signUp({username, password, attributes: { email }});
      router.push({
        pathname: '/register/confirm',
        query: { username: encodeURIComponent(username), },
    });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return <Form onSubmit={onSubmit} />;
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage;