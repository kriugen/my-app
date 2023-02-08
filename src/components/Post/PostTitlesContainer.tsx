import { Button } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listPosts } from "src/graphql/queries";
import PostTitles from "./PostTitles";

function PostTitlesContainer({ search }: any) {
  const [posts, setPosts] = useState<any>([]);
  const [token, setToken] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);

  useEffect(() => {
    const loadPosts = async () => {
      const postData: any = await API.graphql({
        query: listPosts,
        variables: { filter: { 
          title: {
            contains: search
          }
        },
          limit: 2,
          nextToken: token,
        }
      });

      setPosts((posts: any) => [...posts, ...postData.data.listPosts.items]);
      setNextToken(postData.data.listPosts.nextToken);
    }

    loadPosts();
  }, [search, token]);

  return <>
    <PostTitles posts={posts} />
    <Button onClick={() => setToken(nextToken)}>Load More</Button>
  </>;
}

export default PostTitlesContainer;