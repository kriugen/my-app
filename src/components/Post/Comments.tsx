import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { deleteComment } from 'src/graphql/mutations';
import { useErrorContext } from '../ErrorContextProvider';
import Comment from './Comment'

const Comments = ({ post, onEdit }: any) => {
  const router = useRouter();

  const onDelete = async (comment: any) => {
    if (!confirm('Do you really want to delete this comment?')) {
      return;
    }

    await API.graphql({
      query: deleteComment,
      variables: { input: { id: comment.id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    router.push('/posts/' + post.id);
  }

  return post?.comments?.items.map((c: any) =>
    <Comment key={c.id} comment={c} onEdit={onEdit} onDelete={onDelete} />)
};

export default Comments;