import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { useErrorContext } from "../../components/ErrorContextProvider";

import ViewPost from "../../components/Post/ViewPost";
import { GetServerSideProps } from "next";

export default function ViewPostContainer({ post }: any) {
  const router = useRouter();
  const { setError } = useErrorContext();

  const onEdit = () => {
    router.push(`/profile/${post.id}/edit`);
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

const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      username
      coverImage
      published
      comments {
        items {
          message
          id
          createdBy
          createdAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

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