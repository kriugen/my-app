import PostTitlesContainer from './Post/PostTitlesContainer';

function HomeComponent({ posts }: any) {
    return <PostTitlesContainer posts={ posts } />;
}

export default HomeComponent;