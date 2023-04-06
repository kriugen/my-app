import { API, Storage } from "aws-amplify";
import { useState } from "react";
import { updateProfile } from "src/graphql/mutations";
import { useImageUrl } from "src/hooks/imageUrl";
import { useErrorContext } from "../ErrorContextProvider";
import ProfileForm from "./ProfileForm";
import { v4 as uuid } from "uuid";
import { useProfile } from "src/hooks/profile";

function ProfileContainer({ id }: any) {
  const { setError } = useErrorContext();

  const { profile, setProfile } = useProfile(id);

  const [image, setImage] = useState(null);
  const imageUrl = useImageUrl(profile);

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

      setProfile(updatedProfile)
    } catch (e: any) {
      setError(e);
      return null;
    }
  }

  return <ProfileForm profile={profile} imageUrl={imageUrl} setImage={setImage}
    onSubmit={(profile: any) => submitProfile(profile)} />
}

export default ProfileContainer;