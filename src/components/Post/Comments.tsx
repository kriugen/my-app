import { Box } from "@mui/material";

const Comments = ({ post }: any) => {
  console.log('POST+++', post)
  return post?.comments?.items.map((c: any) => 
    <Box key={c.id}>
        {c.createdBy}&nbsp;{c.createdAt}
        <Box>{c.message}</Box>
    </Box>)
};

export default Comments;