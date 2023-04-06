import { Amplify, Auth, Hub, Storage } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { UpdateProfileInput } from "src/API";
import { getOrCreateProfile } from "src/hooks/profile";

import awsConfig from '../aws-exports';

Amplify.configure({ ...awsConfig, ssr: true });

type ContextType = {
  user: {
    username: string,
    attributes: { sub: string },
    profile: UpdateProfileInput & { imageUrl: string },
  } | null,
  logOut: () => void,
}

const defaultValue = {
  user: null,
  logOut: () => { throw new Error('Context not initialized'); }
}

const AuthContext = createContext<ContextType>(defaultValue);
export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(defaultValue.user);
  useEffect(() => {
    authListener();
  }, []);

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setUser(data.payload.data);
        case "signOut":
          return setUser(defaultValue.user);
      }
    });

    try {
      const user = await Auth.currentAuthenticatedUser();
      user.profile = await getOrCreateProfile(user.attributes.sub);
      user.profile.imageUrl = await Storage.get(user.profile.image);

      setUser(user);
    } catch (err) {
      setUser(null);
    }
  }

  const logOut = () => Auth.signOut();

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);