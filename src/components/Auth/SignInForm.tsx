import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, Link, Row } from "../UI";

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
  password: yup.string().required(),
});

export type SignInFormValue = yup.InferType<typeof schema>

const SignInForm = ({ onSubmit, loading }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValue>({
    resolver: yupResolver(schema)
  });

  return <Form onSubmit={handleSubmit(onSubmit)}>
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
      inputProps={{
        "data-test": "username"
      }} 
    />
    <TextField
      fullWidth
      {...register("password")}
      error={!!errors.password}

      type="password"
      label="Password" 
      placeholder="Enter your password"
      helperText={
        errors.password 
          ? <span data-test='invoice-number-error'>{errors.password.message}</span>
          : " "
      }
      inputProps={{
        "data-test": "password"
      }}
    />
    <Link href="/password/forgot">Forgot your password?</Link>
    <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        data-test="signin-button"
      >
        Sign In
    </LoadingButton>
    <Row>
      <p>Do not have an account?</p>&nbsp;
      <Link href="/signup">Sign Up</Link>
    </Row>
  </Form>
};

export default SignInForm;