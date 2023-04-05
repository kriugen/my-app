import { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

export function useImageUrl(post: any) {
  const [imageUrl, setImageUrl] = useState<string | null>();
  useEffect(() => {
    if (post) {
      if (!post.image) {
        setImageUrl(null);
      } else {
        Storage.get(post.image)
          .then((imageUrl) => setImageUrl(imageUrl));
      }
    }
  }, [post]);
  
  return imageUrl;
}