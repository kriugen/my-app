import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const schema = yup.object({
  firstName: yup.string().max(128).required(),
  lastName: yup.string().max(128).required(),
});

export type FormValue = yup.InferType<typeof schema>
const emptyProfile = { id: '', firstName: '', lastName: '' };

const ProfileForm = ({ profile, onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: { ...profile ?? emptyProfile },
  });

  return <Box component="form"
    sx={{ width: 1, m: 3 }}
    noValidate
    onSubmit={handleSubmit(onSubmit)}>
    <TextField
      fullWidth
      {...register("firstName")}
      error={!!errors.firstName}
      label="First Name"
      placeholder="First Name"
      helperText={
        errors.firstName
          ? <span data-test='invoice-number-error'>{errors.firstName.message}</span>
          : " "
      }
      inputProps={{
        "data-test": "firstName"
      }}
    />
    <TextField
      fullWidth
      {...register("lastName")}
      error={!!errors.lastName}
      label="Last Name"
      placeholder="Last Name"
      helperText={
        errors.lastName
          ? <span data-test='invoice-number-error'>{errors.lastName.message}</span>
          : " "
      }
      inputProps={{
        "data-test": "lastName"
      }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
      <LoadingButton
        loading={false}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ ml: 5 }}
        data-test="submit-profile"
      >
        Submit
      </LoadingButton>
    </Box>
  </Box>
};

export default ProfileForm;