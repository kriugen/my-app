import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { deletePost } from "../../src/graphql/mutations";
import { useImageUrl } from "../../src/hooks";
import { useErrorContext } from "../ErrorContextProvider";

import ViewPost from "./ViewPost";

export default function ViewPostContainer({ post }: any) {
  const router = useRouter();
  const { setError } = useErrorContext();
  const imageUrl = useImageUrl(post);
  
  const onEdit = () => {
    router.push(`/posts/${post.id}/edit`);
  }

  const onDelete = async () => {
    if (!confirm('Do you really want to delete this post?')) {
      return;
    }
    
    await API.graphql({
      query: deletePost,
      variables: { input: { id: post.id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    router.push('/posts/my');
  }

  if (!post) {
    setError('Post not found');
    return null;
  }

  return <ViewPost 
    post={post}
    imageUrl={imageUrl}
    onEdit={onEdit}
    onDelete={onDelete}
  />;
}