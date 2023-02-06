import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ImageUpload from "../ImageUpload";

const schema = yup.object({
  title: yup.string().max(128).required(),
  content: yup.string(),
});

export type FormValue = yup.InferType<typeof schema>
const emptyPost = { title: '', content: ''};

const NewPostForm = ({ post, onSubmit, imageUrl, setImage }: any) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: { ...post ?? emptyPost }
  });

  return <Box component="form" 
    sx={{width: 1, m: 3}}
    noValidate
    onSubmit={handleSubmit(onSubmit)}>
    <TextField
      fullWidth
      {...register("title")}
      error={!!errors.title}
      label="Title"
      placeholder="Title"
      helperText={
        errors.title 
          ? <span data-test='invoice-number-error'>{errors.title.message}</span>
          : " "
      }
      inputProps={{
        "data-test": "title"
      }} 
    />
    <Controller
      name="content"
      control={control}
      render={({
        field: { onChange, value },
      }) => (
        <SimpleMDE
          value={value}
          onChange={(value: any) => {
            onChange(value);
          }}
      />)}
    />

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
      <ImageUpload src={imageUrl} setImage={setImage} />
      <LoadingButton
          loading={false}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ ml: 5 }}
          data-test="submit-post"
        >
              Submit
      </LoadingButton>
    </Box>
  </Box>
};

export default NewPostForm;