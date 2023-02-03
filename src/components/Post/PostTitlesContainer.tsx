import PostTitles from "./PostTitles";
import { useRouter } from "next/router";

function PostTitlesContainer({ posts }: any) {
  const router = useRouter();
  return <PostTitles posts={posts} onAdd={() => router.push('/posts/new')} />;
}

export default PostTitlesContainer;