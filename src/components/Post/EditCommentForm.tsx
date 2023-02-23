import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const schema = yup.object({
  message: yup.string(),
});

export type FormValue = yup.InferType<typeof schema>
const emptyComment = { message: '' };

const EditCommentForm = ({ comment, onSubmit }: any) => {
  const { control, handleSubmit, reset } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: { ...comment ?? emptyComment },
  });

  const formSubmit = (data: any) => {
    onSubmit(data);
    reset();
  }

  return <Box component="form"
    sx={{ m: 3, clear: 'both' }}
    noValidate
    onSubmit={handleSubmit(formSubmit)}>
    <Controller
      name="message"
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
    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'start' }}>
      <LoadingButton
        loading={false}
        type="submit"
        variant="contained"
        sx={{ ml: 5 }}
        data-test="submit-post"
      >
        Add Comment
      </LoadingButton>
    </Box>
  </Box>
};

export default EditCommentForm;