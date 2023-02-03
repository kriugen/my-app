import { Auth } from "aws-amplify";
import { useState } from "react";
import { useErrorContext } from "../ErrorContextProvider";

import ConfirmSignUpForm from "./ConfirmSignUpForm";

function ConfirmSignUpFormContainer({ username }: any) {
  const { setError } = useErrorContext();

  const [message, setMessage] = useState(
    'Confirmation Code was sent to your email. Please enter it in the form below:');
  const onSubmit = async ({ username, code }: any) => {
    try {
      await Auth.confirmSignUp(username, code);
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

  return <ConfirmSignUpForm 
    message={message} 
    username={username} 
    onSubmit={onSubmit} 
    onResend={onResend} 
  />;
}

export default ConfirmSignUpFormContainer;