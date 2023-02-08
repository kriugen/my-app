import { Button } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listPosts } from "src/graphql/queries";
import PostTitles from "./PostTitles";

function PostTitlesContainer({ search }: any) {
  const [posts, setPosts] = useState<any>([]);
  const [token, setToken] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function handleScroll() {
    if (Math.floor(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
    console.log('handleScroll setToken', nextToken)
    setToken(nextToken);
  }

  useEffect(() => {
    const loadPosts = async () => {
      const postData: any = await API.graphql({
        query: listPosts,
        variables: { filter: {
          title: {
            contains: search
          }
        },
          limit: 5,
          nextToken: token,
        }
      });

      setPosts((posts: any) => [...posts, ...postData.data.listPosts.items]);
      setNextToken(postData.data.listPosts.nextToken);
      console.log('nextToken arrived', postData.data.listPosts.nextToken)
      setIsFetching(false)
    }

    loadPosts();
  }, [search, token]);

  return <>
    <PostTitles posts={posts} />
    <Button onClick={() => setToken(nextToken)}>Load More</Button>
  </>;
}

export default PostTitlesContainer;