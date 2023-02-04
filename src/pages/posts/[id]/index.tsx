import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { deletePost } from "../../../graphql/mutations";
import { useImageUrl } from "../../../hooks";
import { useErrorContext } from "../../../components/ErrorContextProvider";

import ViewPost from "../../../components/Post/ViewPost";
import { getPost } from "src/graphql/queries";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const { id } = params;
  const postData: any = await API.graphql({
    query: getPost,
    variables: { id },
  });
  
  return {
    props: {
      post: postData.data.getPost,
    },
  };
}