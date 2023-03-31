import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { createProfile, updateProfile } from "src/graphql/mutations";
import { useErrorContext } from "../ErrorContextProvider";
import ProfileForm from "./ProfileForm";

const getProfile = `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      firstName
      lastName
      DOB
    }
  }`;

function ProfileContainer({ id }: any) {
  const { setError } = useErrorContext();
  const [profile, setProfile] = useState<{ id: string } | null>(null);

  useEffect(() => {
    profileHandler();
    async function profileHandler() {
      try {
        const data = await getOrCreateProfile(id);
        setProfile(data);
      } catch (e: any) {
        setError(e.message);
      }
    }
  }, [id, setError])

  if (!profile) {
    return <div>Loading Profile</div>
  }

  async function submitProfile(updatedProfile: any) {
    try {
      await API.graphql({
        query: updateProfile,
        variables: { input: updatedProfile },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      setProfile(updatedProfile);
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }

  return <ProfileForm profile={profile}
    onSubmit={(profile: any) => submitProfile(profile)} />
}

async function getOrCreateProfile(id: string) {
  const profileData: any = await API.graphql({
    query: getProfile,
    variables: { id },
  });

  let data = profileData.data.getProfile;
  if (!data) {
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
  }

  return data;
}

export default ProfileContainer;