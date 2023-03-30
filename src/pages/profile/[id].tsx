import { API, withSSRContext } from "aws-amplify";
import { useEffect } from "react";
import { createProfile } from "src/graphql/mutations";

const getProfile = `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      firstName
      lastName
      DOB
    }
  }`;

function Profile({ id, error }: any) {
  useEffect(() => {
    getOrCreateProfile(id);
  }, [id])

  if (error) {
    return <div>{error}</div>
  }

  return <div>Profile for user sub {id}</div>
}

export const getServerSideProps: any = async ({ req, params }: any) => {
  const { id } = params;

  const SSR = withSSRContext({ req });
  try {
    await SSR.Auth.currentAuthenticatedUser();
    return {
      props: {
        id,
      }
    }
  } catch (e) {
    return {
      props: {
        error: 'User not authenticated',
      }
    }
  }
}

async function getOrCreateProfile(id: string) {
  const profileData: any = await API.graphql({
    query: getProfile,
    variables: { id },
  });

  let data = profileData.data.getPost;
  if (!data) {
    try {
      data = {
        id
      };

      await API.graphql({
        query: createProfile,
        variables: {
          input: data,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

    } catch (e: any) {
      return <div>{e.message}</div>
    }
  }

  return data;
}

export default Profile;