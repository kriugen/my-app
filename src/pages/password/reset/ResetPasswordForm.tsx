import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, styled, CardContent, TextField } from "@mui/material";
import { useEffect } from "react";
import MuiCard, { CardProps } from '@mui/material/Card'
import FooterIllustrationsV1 from "src/views/pages/auth/FooterIllustration";

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
  code: yup.string().min(3).max(128).required(),
  password: yup.string().min(3).max(128).required(),
  confirmPassword: yup.string().min(3).max(128).required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type ResetPasswordValue = yup.InferType<typeof schema>

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const ResetPasswordForm = ({ username, onSubmit }: any) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<ResetPasswordValue>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset({ username });
}, [reset, username]);

  return <Box className='content-center'>
  <Card sx={{ zIndex: 1 }}>
    <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 7)} !important` }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="Code"
          helperText={
            errors.code 
              ? <span data-test='invoice-number-error'>{errors.code.message}</span>
              : " "
          }
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
        />
        <TextField
          type='password'
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          label="Confirm Password"
          placeholder="Confirm Password"
          helperText={
            errors.confirmPassword 
              ? <span data-test='invoice-number-error'>{errors.confirmPassword.message}</span>
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
            Reset Password
        </LoadingButton>
        </form>
      </CardContent>
    </Card>
    <FooterIllustrationsV1 />
  </Box>
};

export default ResetPasswordForm;