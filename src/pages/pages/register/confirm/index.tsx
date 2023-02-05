import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useErrorContext } from "src/components/ErrorContextProvider";
import Form from "./Form";

function RegisterConfirmPage() {
    const router = useRouter();
    const { username } = router.query;

    const { setError } = useErrorContext();

    const [message, setMessage] = useState(
      'Confirmation Code was sent to your email. Please enter it in the form below:');
    const onSubmit = async ({ username, code }: any) => {
      try {
        await Auth.confirmSignUp(username, code);
        router.push('/pages/login');
      } catch (e: any) {
        setError(e.message);
      }
    };
  
    const onResend = async (username: string) => {
      try {
        await Auth.resendSignUp(username);
        setMessage('Confirmation code has been resent to your email.');
      } catch (e: any) {
        setError(e.message);
      }
    };
  
    return <Form 
      message={message} 
      username={username} 
      onSubmit={onSubmit} 
      onResend={onResend} 
    />;
}

RegisterConfirmPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterConfirmPage;