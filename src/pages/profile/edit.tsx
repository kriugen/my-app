import { API } from "aws-amplify";

import Form from "../../components/EditProfileForm";
import { useErrorContext } from "../../components/ErrorContextProvider";
import { updateProfile } from "src/graphql/mutations";
import { getProfile } from "src/graphql/queries";

function FormContainer({ profile }: any) {
  const { setError } = useErrorContext();

  const onSubmit = async (formData: any) => {
    await editProfile(formData);
  };

  const editProfile = async (formData: any) => {
    try {
      console.log('PROFILE FORMDATA', formData)
      await API.graphql({
        query: updateProfile,
        variables: { input: formData },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (e: any) {
      setError(e);
      return null;
    }

    return formData.id;
  }

  return <Form
    profile={profile}
    onSubmit={onSubmit}
  />;
}

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;
  const profileData: any = await API.graphql({
    query: getProfile,
    variables: { id },
  });

  return {
    props: {
      profile: profileData.data.getProfile,
    },
  };
}

export default FormContainer;