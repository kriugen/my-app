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
  content: yup.string(),
});

export type FormValue = yup.InferType<typeof schema>
const emptyComment = { content: ''};

const EditCommentForm = ({ comment, onSubmit }: any) => {
  const { control, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: { ...comment ?? emptyComment },
  });

  return <Box component="form"
    sx={{m: 3}}
    noValidate
    onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name="content"
      control={control}
      render={({
        field: { onChange, value },
      }) => (
        <SimpleMDE
          options={{maxHeight: '100px'}}
          value={value}
          onChange={(value: any) => {
            onChange(value);
          }}
      />)}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
      <LoadingButton
          loading={false}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ ml: 5 }}
          data-test="submit-post"
        >
              Add Comment
      </LoadingButton>
    </Box>
  </Box>
};

export default EditCommentForm;