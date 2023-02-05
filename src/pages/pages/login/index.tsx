import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

import Form from "./LoginForm";
import { ReactNode } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";

import { useErrorContext } from "src/components/ErrorContextProvider";
import { useLoadingContext } from "src/components/LoadingContextProvider";

function Page({ referer }: any) {
  const router = useRouter();

  const {setError} = useErrorContext();
  const { loading, setLoading } = useLoadingContext();
  
  const onSubmit = async ({ username, password }: any) => {
    try {
      setLoading(true);
      await Auth.signIn(username, password);

      if (!referer || referer.includes('/register/confirm') ) {
        router.push('/');
      } else {
        router.back();
      }
    } catch (e: any) {
        if (e.code == 'UserNotConfirmedException') {
          router.push({
              pathname: '/pages/register/confirm',
              query: { username: encodeURIComponent(username), },
          });
        } else {
          setError(e.message);
        }
      }
  };

  return <Form onSubmit={ onSubmit } loading={ loading } />;
}

Page.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export async function getServerSideProps(context: any) {
  return {
    props: {
      referer: context.req.headers.referer ?? null,
    },
  };
}

export default Page;