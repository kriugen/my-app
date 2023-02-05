import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useEffect } from "react";
import { Box, Button, CardContent, styled, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FooterIllustrationsV1 from "src/views/pages/auth/FooterIllustration";
import MuiCard, { CardProps } from '@mui/material/Card'

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
  code: yup.string().required(),
});

export type ConfirmSignUpFormValue = yup.InferType<typeof schema>

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ConfirmSignUpForm = ({ username, message, onSubmit, onResend }: any) => {
  const { register, reset, handleSubmit, getValues, formState: { errors } } = useForm<ConfirmSignUpFormValue>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset({ username });
}, [reset, username]);

  return <Box className='content-center'>
    <Card sx={{ zIndex: 1 }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 7)} !important` }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          { message && <p>{message}</p> }
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
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Button onClick={() => {
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
          </Box>
        </form>
      </CardContent>
    </Card>
    <FooterIllustrationsV1 />
  </Box>
};

export default ConfirmSignUpForm;