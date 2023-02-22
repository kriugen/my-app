import { Avatar, Card, CardActionArea, CardContent, Typography } from "@mui/material";

const Comment = ({ comment }: any) => {
  return <Card sx={{ m: 1, width: '100%'}}>
      <CardActionArea sx={{ display: 'flex', minHeight: 140 }}>
      <Avatar
        sx={{ width: 40, height: 40 }}
        src='/images/avatars/broken-link.png'
        alt={ comment.createdBy }
      />
        <CardContent sx={{ width: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            by: { comment.createdBy }&nbsp;{comment.createdAt}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {comment.message}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
};

export default Comment;