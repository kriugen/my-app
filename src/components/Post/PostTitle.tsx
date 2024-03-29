import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PostTitle({ post, imageUrl, onClick }: any) {
  return (
    <Card sx={{ m: 1, width: '100%'}}>
      <CardActionArea sx={{ display: 'flex', minHeight: 140 }} 
        onClick={ onClick }>
        { imageUrl &&
          <CardMedia
            height="140"
            sx={{ maxWidth: 200 }}
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