import { Avatar, Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Comment = ({ comment }: any) => {
  return <Box sx={{ m: 2, width: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        sx={{ width: 40, height: 40 }}
        src='/images/avatars/broken-link.png'
        alt={comment.createdBy}
      />
      <Typography sx={{ fontSize: 12, m: 3 }} color="text.secondary">
        {comment.createdBy}
      </Typography>
      <Typography>{comment.createdAt}</Typography>
      <IconButton><EditIcon /></IconButton>
      <IconButton><DeleteIcon /></IconButton>
    </Box>
    <Typography sx={{ pl: 12 }} component="div">
      {comment.message}
    </Typography>
  </Box>
};

export default Comment;