import { useRouter } from "next/router";

import PostTitle from "./PostTitle";
import { useImageUrl } from "../../hooks";

function PostTitleContainer({ post }: any) {
  const router = useRouter();
  const imageUrl = useImageUrl(post);

  return <PostTitle 
    post={post} 
    imageUrl={imageUrl}
    onClick={() => router.push('/posts/' + post.id)} 
  />;
}

export default PostTitleContainer;