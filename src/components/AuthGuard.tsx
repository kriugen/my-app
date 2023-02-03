import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "./AuthContextProvider";

export default function AuthGuard({ children }: any) {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user?.username)
      router.push('/signin');
  }, [user, router]);

  if (user?.username)
    return children;

  return null;
}