import { Box, CircularProgress } from "@mui/material";
import { API } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import { listPosts } from "src/graphql/queries";
import { useErrorContext } from "../ErrorContextProvider";
import { useLoadingContext } from "../LoadingContextProvider";
import PostTitles from "./PostTitles";

function PostTitlesContainer({ search }: any) {
  const { setError } = useErrorContext();
  const { setLoading } = useLoadingContext();
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
        setIsFetching(true);
        setLoading(true);
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
          if (token) {
            setPosts((posts: any) => [...posts, ...postsResult.items]);
          } else {
            setPosts(postsResult.items);
          }

          setNextToken(postsResult.nextToken);

          if (postsResult.nextToken == null) {
            setIsComplete(true);
          }
        }

        handleResult(postData.data.listPosts);
        setIsFetching(false);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    }

    loadPosts();
  }, [search, token, setError, setLoading]);

  return (posts && posts.length > 0)
    ? <PostTitles posts={posts} /> 
    : <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </Box> 
}

export default PostTitlesContainer;