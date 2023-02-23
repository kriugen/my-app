import { Avatar, Box, Typography } from "@mui/material";

const Comment = ({ comment }: any) => {
  return <Box sx={{ m: 2, width: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Avatar
        sx={{ width: 40, height: 40 }}
        src='/images/avatars/broken-link.png'
        alt={comment.createdBy}
      />
      <Typography sx={{ fontSize: 12 }} color="text.secondary">
        {comment.createdBy}
      </Typography>
      <Typography>{comment.createdAt}</Typography>
    </Box>
    <Typography sx={{ pl: 12 }} component="div">
      {comment.message}
    </Typography>
  </Box>
};

export default Comment;