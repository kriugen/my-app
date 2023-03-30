import { API, withSSRContext } from "aws-amplify";
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
  return <div>Profile for user sub {id}, error {error}</div>
}

export const getServerSideProps: any = async ({ req, params }: any) => {
  const { id } = params;

  const SSR = withSSRContext({ req });

  try {
    await SSR.Auth.currentAuthenticatedUser();
    return await getOrCreateProfile(id);
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
      return {
        props: {
          error: e.message,
        }
      }
    }
  }

  return {
    props: {
      id: data.id,
    },
  };
}

export default Profile;