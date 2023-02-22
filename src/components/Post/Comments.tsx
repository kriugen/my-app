import { Avatar, Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

const Comments = ({ post }: any) => {
  return post?.comments?.items.map((c: any) => 
    <Card key={c.id} sx={{ m: 1, width: '100%'}}>
      <CardActionArea sx={{ display: 'flex', minHeight: 140 }}>
      <Avatar
        sx={{ width: 40, height: 40 }}
        src='/images/avatars/broken-link.png'
        alt={ c.createdBy }
      />
        <CardContent sx={{ width: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            by: { c.createdBy }&nbsp;{c.createdAt}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {c.message}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>)
};

export default Comments;