import { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

export function useImageUrl(post: any) {
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    if (post) {
      Storage.get(post.coverImage)
        .then((imageUrl) => setImageUrl(imageUrl));
    }
  }, [post]);
  
return imageUrl;
}
