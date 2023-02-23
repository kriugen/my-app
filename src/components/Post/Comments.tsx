import Comment from './Comment'

const Comments = ({ post, onEdit }: any) => {
  return post?.comments?.items.map((c: any) =>
    <Comment key={c.id} comment={c} onEdit={onEdit} />)
};

export default Comments;