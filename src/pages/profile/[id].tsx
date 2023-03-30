import ProfileContainer from '../../components/Profile'
import { withSSRContext } from "aws-amplify";

function Profile({ id, error }: any) {
  if (error) {
    return <div>{error}</div>
  }

  return <ProfileContainer id={id} />
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

export default Profile;