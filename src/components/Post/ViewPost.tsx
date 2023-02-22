import { Box, Button, 
  Card, CardActions, 
  CardContent, CardMedia, 
  Typography } from "@mui/material";
import ReactMarkDown from "react-markdown";
import { useAuthContext } from "../AuthContextProvider";
import Comments from "./Comments";
import EditCommentForm from "./EditCommentForm";

export default function ViewPost({ post, imageUrl, onEdit, onDelete }: any) {
  const { user } = useAuthContext();
  return <Card>
    <Box sx={{ display: 'flex', p: 5, alignItems: 'center' }}>
    {
      imageUrl && <CardMedia
        component="img"
        image={ imageUrl }
        sx={{ maxWidth: 200 }}
      /> 
    }
      <Typography gutterBottom variant="h5" component="div">
        { post.title }
      </Typography>
    </Box>
    <CardContent sx={{ pt: 0 }}>
      <Typography variant="body2" color="text.secondary">
        <ReactMarkDown className='prose'>{post.content ?? ''}</ReactMarkDown>
      </Typography>
    </CardContent>
    { user?.username == post.username &&
    <CardActions sx={{ justifyContent: 'end' }}>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </CardActions> }
    <EditCommentForm />
    <Comments post={post} />
  </Card>
}