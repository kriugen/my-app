import Comment from './Comment'

const Comments = ({ post }: any) => {
  return post?.comments?.items.map((c: any) => 
    <Comment key={c.id} comment={c} />)
};

export default Comments;