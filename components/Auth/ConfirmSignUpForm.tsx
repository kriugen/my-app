import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { 
  Form, 
  Row, 
} from "../UI";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
  code: yup.string().required(),
});

export type ConfirmSignUpFormValue = yup.InferType<typeof schema>

const ConfirmSignUpForm = ({ username, message, onSubmit, onResend }: any) => {
  const { register, reset, handleSubmit, getValues, formState: { errors } } = useForm<ConfirmSignUpFormValue>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset({ username });
}, [reset, username]);

  return <Form className="w-4/12" message={message} onSubmit={handleSubmit(onSubmit)}>
  <TextField
      fullWidth
      {...register("username")}
      error={!!errors.username}
      label="Username"
      placeholder="Username"
      helperText={
        errors.username 
          ? <span data-test='invoice-number-error'>{errors.username.message}</span>
          : " "
      }
    />
    <TextField
      fullWidth
      {...register("code")}
      error={!!errors.code}
      label="Code"
      placeholder="Confirmation Code"
      helperText={
        errors.code 
          ? <span data-test='invoice-number-error'>{errors.code.message}</span>
          : " "
      }
    />
    <Row>
      <Button onClick={(e: any) => {
        const username = getValues('username');
        onResend(username);
      }}>Resend</Button>
      <LoadingButton
        loading={false}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, width: '50%' }}
        fullWidth
      >
        Confirm
    </LoadingButton>
    </Row>
  </Form>
};

export default ConfirmSignUpForm;