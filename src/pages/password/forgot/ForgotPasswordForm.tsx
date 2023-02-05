import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, CardContent, styled, TextField } from "@mui/material";
import MuiCard, { CardProps } from '@mui/material/Card'
import FooterIllustrationsV1 from "src/views/pages/auth/FooterIllustration";

const schema = yup.object({
  username: yup.string().min(3).max(128).required(),
});

export type ForgotPasswordValue = yup.InferType<typeof schema>

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ForgotPasswordForm = ({ onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValue>({
    resolver: yupResolver(schema)
  });

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
        <LoadingButton
            loading={false}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Get Reset Code
        </LoadingButton>
        </form>
      </CardContent>
    </Card>
    <FooterIllustrationsV1 />
  </Box>
};

export default ForgotPasswordForm;