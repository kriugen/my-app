import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Form, Link, Row } from "../UI";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
  email: yup.string().email("Should be valid email").required(),
  password: yup.string().required(),
});

export type SignUpFormValue = yup.InferType<typeof schema>

const SignUpForm = ({ onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValue>({
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
      {...register("email")}
      error={!!errors.email}
      label="Email"
      placeholder="mail@gmail.com"
      helperText={
        errors.email 
          ? <span data-test='invoice-number-error'>{errors.email.message}</span>
          : " "
      }
      inputProps={{
        "data-test": "email"
      }} 
    />
    <TextField
      type='password'
      fullWidth
      {...register("password")}
      error={!!errors.password}
      label="Password"
      placeholder="Password"
      helperText={
        errors.password 
          ? <span data-test='invoice-number-error'>{errors.password.message}</span>
          : " "
      }
      inputProps={{
        "data-test": "password"
      }} 
    />
    <LoadingButton
        loading={false}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        data-test="signup-button"
      >
        Sign Up
    </LoadingButton>
    <Row>
      <p>Already have an account?</p>
      <Link href="/signin">Sign In</Link>
    </Row>
  </Form>
};

export default SignUpForm;