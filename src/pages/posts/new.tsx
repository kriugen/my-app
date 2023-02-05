import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, Storage, withSSRContext } from "aws-amplify";
import { v4 as uuid } from "uuid";

import Form from "../../components/Post/EditPostForm";
import { useErrorContext } from "../../components/ErrorContextProvider";
import { GetServerSideProps } from "next";
import { createPost } from "src/graphql/mutations";

function NewPostPage({ auth }: any) {
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  }, [auth, router]);

  const { setError } = useErrorContext();

  const [image, setImage] = useState(null);
  const onSubmit = async (formData: any) => {
    const id = await newPost(formData);
    if (id) 
      router.push(`/posts/${id}`);
  };

  const saveImage = async (post: any) => {
    if (image) {
      post.coverImage = `${(image as any).name}_${uuid()}`;
      await Storage.put(post.coverImage, image);
    }
  }

  const newPost = async (formData: any) => {
    const id = uuid();
    formData.id = id;

    await saveImage(formData);

    try {
        await API.graphql({
        query: createPost,
        variables: { input: formData },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (e: any) {
      setError(e);
      
      return null;
    }

    return id;
  }

  if (!auth)
    return null;

  return <Form 
    post={null}
    onSubmit={onSubmit}
    imageUrl={null}
    setImage={setImage}
  />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  try {
    await SSR.Auth.currentAuthenticatedUser();
    
return {
      props: {
        auth: true,
      },
    };
  } catch {
    return {
      props: {
        auth: false,
      },
    };
  }
}

export default NewPostPage;