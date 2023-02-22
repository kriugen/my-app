import { List, ListItem, ListItemText } from "@mui/material";

const Comments = ({ post }: any) => {
  console.log('+++POST', post);
  console.log('+++POST Comments', post?.comments);
  console.log('+++POST Comments Items', post?.comments?.items);

  return <List>{post?.comments?.items.map((c: any) => 
    <ListItem key={c.id}>
        <ListItemText>{c.message}</ListItemText>
    </ListItem>)}
  </List>;
};

export default Comments;