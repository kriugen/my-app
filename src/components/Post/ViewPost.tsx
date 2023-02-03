import { Box, Button, Paper, Typography } from "@mui/material";
import ReactMarkDown from "react-markdown";
import { useAuthContext } from "../AuthContextProvider";

export default function ViewPost({ post, imageUrl, onEdit, onDelete }: any) {
  const { user } = useAuthContext();
  
  return <Box sx={{ width: 1, m: 2 }}>
    { user?.username == post.username &&
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ }} onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </Box> }
    <Paper sx={{ p: 2 }}>
      <Box>
        <img src={imageUrl} />
        <Typography color="text.secondary" gutterBottom>
          by: {post.username}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
          <ReactMarkDown className='prose'>{post.content ?? ''}</ReactMarkDown>
      </Box>
    </Paper>
  </Box>;
}