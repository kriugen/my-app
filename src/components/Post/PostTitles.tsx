import { Box, Fab } from "@mui/material";

import PostTitleContainer from "./PostTitleContainer";

const PostTitles = ({ posts }: any) => {
  return <Box id='post-titles' 
    sx={{ display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      width: '100%' }}>
    {(posts && posts.length > 0)
        ? posts.map((item: any) => (<PostTitleContainer post={item} key={item.id} />)) 
        : <div>No Posts</div>
    }
  </Box>
}

export default PostTitles;