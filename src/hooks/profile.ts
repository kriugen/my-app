import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { useErrorContext } from "src/components/ErrorContextProvider";
import { createProfile } from "src/graphql/mutations";
import { getProfile } from "src/graphql/queries";

export function useProfile(id: string) {
  const [profile, setProfile] = useState<any>();
  const { setError } = useErrorContext();
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
  
  return { profile, setProfile };
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
