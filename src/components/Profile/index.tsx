import { API, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { createProfile, updateProfile } from "src/graphql/mutations";
import { useImageUrl } from "src/hooks";
import { useErrorContext } from "../ErrorContextProvider";
import ProfileForm from "./ProfileForm";
import { v4 as uuid } from "uuid";

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

  const [image, setImage] = useState(null);
  const imageUrl = useImageUrl(profile);

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

  const saveImage = async (profile: any) => {
    if (image) {
      profile.image = `${(image as any).name}_${uuid()}`;
      await Storage.put(profile.image, image);
    }
  }

  async function submitProfile(updatedProfile: any) {
    try {
      await saveImage(updatedProfile);

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

  return <ProfileForm profile={profile} imageUrl={imageUrl} setImage={setImage}
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