import { Button } from "@mui/material";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { listPosts } from "src/graphql/queries";
import PostTitles from "./PostTitles";

function PostTitlesContainer({ search }: any) {
  const [posts, setPosts] = useState<any>();
  useEffect(() => {
    const loadPosts = async () => {
      const postData: any = await API.graphql({
        query: listPosts,
        variables: { filter: { 
          title: {
            contains: search
          }
        },
          limit: 2
        }
      });

      setPosts(postData.data.listPosts);
    }

    loadPosts();
  }, [search]);

  return <>
    <PostTitles posts={posts?.items} />
    <Button onClick={() => alert('moar')}>Load More</Button>
  </>;
}

export default PostTitlesContainer;