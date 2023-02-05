import { useState } from "react";
import { useRouter } from "next/router";
import { API, Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";

import Form from "../../components/Post/EditPostForm";
import { useErrorContext } from "../../components/ErrorContextProvider";
import { GetServerSideProps } from "next";
import { getPost } from "src/graphql/queries";
import { useImageUrl } from "src/hooks";
import { createPost } from "src/graphql/mutations";

function FormContainer({ post }: any) {
  const router = useRouter();
  const { setError } = useErrorContext();

  const [image, setImage] = useState(null);
  const imageUrl = useImageUrl(post);

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

  return <Form 
    post={null} 
    onSubmit={onSubmit} 
    imageUrl={imageUrl} 
    setImage={setImage} 
  />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const { id } = params;
  const postData: any = await API.graphql({
    query: getPost,
    variables: { id },
  });
  
  return {
    props: {
      post: postData.data.getPost,
    },
  };
}

export default FormContainer;