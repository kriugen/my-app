import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PostTitle({ post, imageUrl, onClick }: any) {
  return (
    <Card sx={{ m: 1 }}>
      <CardActionArea sx={{display: 'flex'}} onClick={ onClick }>
        { imageUrl &&
          <CardMedia
            sx={{ maxWidth: 200, minHeight: 140 }}
            component="img"
            image={ imageUrl }
            alt="post image"
        />}
        <CardContent sx={{ width: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            by: { post.username }
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            { post.title }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};