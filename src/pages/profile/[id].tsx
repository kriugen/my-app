import { API } from "aws-amplify";
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

function Profile({ id }: any) {
  return <div>Profile for user sub {id}</div>
}

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;

  const profileData: any = await API.graphql({
    query: getProfile,
    variables: { id },
  });

  let data = profileData.data.getPost;

  console.log('PROFILE DATA',)
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
      console.log('ERROR', e)
      return {
        props: {
          error: e,
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