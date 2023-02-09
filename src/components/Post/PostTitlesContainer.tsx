import { API } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import { listPosts } from "src/graphql/queries";
import { useErrorContext } from "../ErrorContextProvider";
import PostTitles from "./PostTitles";

function PostTitlesContainer({ search }: any) {
  const { setError } = useErrorContext();
  const [posts, setPosts] = useState<any>([]);
  const [token, setToken] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleScroll = useCallback(() => {
    if (Math.floor(window.innerHeight + document.documentElement.scrollTop) 
      !== document.documentElement.offsetHeight || isFetching || isComplete) 
        return;
    
    setIsFetching(true);
    setToken(nextToken);
  }, [isFetching, isComplete, nextToken]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData: any = await API.graphql({
          query: listPosts,
          variables: { 
            filter: {
            title: {
              contains: search
            },
          },
          limit: 5,
          nextToken: token 
        }});

        const handleResult = (postsResult: any) => {
          setPosts((posts: any) => [...posts, ...postsResult.items]);
          setNextToken(postsResult.nextToken);

          if (postsResult.nextToken == null) {
            setIsComplete(true);
          }
        }

        handleResult(postData.data.listPosts);
        setIsFetching(false);
      } catch (e) {
        setError(e);
      }
    }

    loadPosts();
  }, [search, token, setError]);

  return <>
    <PostTitles posts={posts} />
  </>;
}

export default PostTitlesContainer;