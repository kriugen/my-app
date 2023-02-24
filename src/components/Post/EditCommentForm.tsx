import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

const schema = yup.object({
  message: yup.string(),
});

export type FormValue = yup.InferType<typeof schema>
const emptyComment = { message: '' };

const EditCommentForm = ({ comment, onSubmit, onReset }: any) => {
  console.log('COMMENT', comment)
  const { control, handleSubmit, reset } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(comment ?? emptyComment);
  }, [reset, comment]);

  const formSubmit = (data: any) => {
    onSubmit(data);
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
            console.log('SMDE onChange', value)
            onChange(value);
          }}
        />)}
    />
    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'start' }}>
      <Button onClick={() => onReset()}>Cancel</Button>
      <LoadingButton
        loading={false}
        type="submit"
        variant="contained"
        sx={{ ml: 5 }}
        data-test="submit-post"
      >
        {comment ? 'Update' : 'Add'}&nbsp;Comment
      </LoadingButton>
    </Box>
  </Box>
};

export default EditCommentForm;