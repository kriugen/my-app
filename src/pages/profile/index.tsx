import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { useErrorContext } from "../../components/ErrorContextProvider";

import { GetServerSideProps } from "next";
import { useAuthContext } from "src/components/AuthContextProvider";
import ViewProfile from "src/components/Profile/ViewProfile";

const getProfile = /* GraphQL */ `
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

export default function ViewPostContainer() {
  const router = useRouter();
  const { setError } = useErrorContext();
  const { user } = useAuthContext();
  console.log('USER PROFILE', user);

  if (!user) {
    return null;
  }

  return <p>{user.username}</p>

  // const onEdit = () => {
  //   router.push(`/profile/${post.id}/edit`);
  // }

  // if (!post) {
  //   setError('Post not found');
  //   return null;
  // }

  // return <ViewProfile
  //   profile={profile}
  //   onEdit={onEdit}
  // />;
}