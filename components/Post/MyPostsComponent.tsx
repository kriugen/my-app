import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { listPosts } from '../../src/graphql/queries';
import PostTitleCollection from './PostTitles';

function MyPostsComponent() {
    const [posts, setPosts] = useState();
    const query = async () => {
        const postData: any = await API.graphql({
            query: listPosts,
          });
        
        const { items } = postData.data.listPosts;
        setPosts(items);
    }

    useEffect(() => {
        query();
    }, []);
 
    return <PostTitleCollection posts={posts} />;
}

export default MyPostsComponent;