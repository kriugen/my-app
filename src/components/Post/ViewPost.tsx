import {
  Box, Button,
  Card, CardActions,
  CardContent, CardMedia,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import ReactMarkDown from "react-markdown";
import { useAuthContext } from "../AuthContextProvider";
import Comments from "./Comments";
import EditCommentForm from "./EditCommentForm";
import { v4 as uuid } from "uuid";
import { API } from "aws-amplify";
import { createComment, updateComment } from "src/graphql/mutations";
import { useErrorContext } from "../ErrorContextProvider";
import { useState } from "react";

export default function ViewPost({ post, imageUrl, onEdit, onDelete }: any) {
  const { user } = useAuthContext();
  const router = useRouter();
  const { setError } = useErrorContext();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState();

  const onSubmit = async (formData: any) => {
    const newComment = async (formData: any) => {
      const id = uuid();
      formData.id = id;

      try {
        await API.graphql({
          query: createComment,
          variables: {
            input: { ...formData, postID: post.id },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      } catch (e: any) {
        setError(e);

        return null;
      }

      return id;
    }

    const editComment = async (formData: any) => {
      const commentUpdated = (({ id, message }: any) => ({ id, message }))(formData);

      try {
        await API.graphql({
          query: updateComment,
          variables: { input: commentUpdated },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      } catch (e: any) {
        setError(e);
        return null;
      }

      return formData.id;
    }

    const id = formData.id
      ? await editComment(formData)
      : await newComment(formData);

    if (id) {
      setShowCommentForm(false);
      setComment(undefined);
      router.push(`/posts/${post.id}`);
    }
  };

  return <Card>
    <Box sx={{ display: 'flex', p: 5, alignItems: 'center' }}>
      {
        imageUrl && <CardMedia
          component="img"
          image={imageUrl}
          sx={{ maxWidth: 200 }}
        />
      }
      <Typography gutterBottom variant="h5" component="div">
        {post.title}
      </Typography>
    </Box>
    <CardContent sx={{ pt: 0 }}>
      <Typography variant="body2" color="text.secondary">
        <ReactMarkDown className='prose'>{post.content ?? ''}</ReactMarkDown>
      </Typography>
    </CardContent>
    {user?.username == post.username &&
      <CardActions sx={{ justifyContent: 'end' }}>
        {!showCommentForm &&
          <Button sx={{ mr: 'auto' }} onClick={() => setShowCommentForm(true)}>Add Comment</Button>
        }
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardActions>}
    {showCommentForm && <EditCommentForm
      comment={comment}
      onSubmit={onSubmit}
      onReset={() => { setComment(undefined); setShowCommentForm(false) }}
    />}
    <hr />
    <Box sx={{ m: 4 }}>
      <Comments post={post}
        onEdit={(c: any) => { setComment(c); setShowCommentForm(true) }} />
    </Box>
  </Card >
}