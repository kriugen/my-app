import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listPosts, postsByPublishedAndTitle } from "src/graphql/queries";
import { useErrorContext } from "../ErrorContextProvider";
import PostTitles from "./PostTitles";

function PostTitlesContainer({ search }: any) {
  const { setError } = useErrorContext();
  const [posts, setPosts] = useState<any>([]);
  const [token, setToken] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function handleScroll() {
    if (Math.floor(window.innerHeight + document.documentElement.scrollTop) 
      !== document.documentElement.offsetHeight || isFetching || isComplete) 
        return;
    
    setIsFetching(true);
    console.log('handleScroll setToken', nextToken)
    setToken(nextToken);
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData: any = await API.graphql({
          query: postsByPublishedAndTitle,
          variables: { 
          //   filter: {
          //   title: {
          //     contains: search
          //   },
          // },
            published: 1,
            limit: 5,
            nextToken: token,
          }
        });

        const handleResult = (postsResult: any) => {
          setPosts((posts: any) => [...posts, ...postsResult.items]);
          setNextToken(postsResult.nextToken);

          if (postsResult.nextToken == null) {
            setIsComplete(true);
          }

          console.log('nextToken arrived', postsResult.nextToken);
        }

        handleResult(postData.data.postsByPublishedAndTitle);

        //handleResult(postData.data.listPosts);
        setIsFetching(false);
      } catch (e) {
        setError(e);
      }
    }

    loadPosts();
  }, [search, token]);

  return <>
    <PostTitles posts={posts} />
  </>;
}

export default PostTitlesContainer;