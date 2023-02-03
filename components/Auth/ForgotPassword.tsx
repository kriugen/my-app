import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Form } from "../UI";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
});

export type ForgotPasswordValue = yup.InferType<typeof schema>

const ForgotPassword = ({ onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValue>({
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
    />
    <LoadingButton
        loading={false}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Get Reset Code
    </LoadingButton>
  </Form>
};

export default ForgotPassword;