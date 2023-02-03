import { Box, Fab } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import PostTitleContainer from "./PostTitleContainer";

const PostTitles = ({ posts, onAdd }: any) => {
  return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Fab sx={{ 
        position: 'absolute', 
        bottom: 16, 
        right: 16 }} 
        onClick={onAdd} 
        color="primary" 
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    {(posts && posts.length > 0)
        ? posts.map((item: any) => (<PostTitleContainer post={item} key={item.id} />)) 
        : <div>No Posts</div>
    }
  </Box>;
}

export default PostTitles;