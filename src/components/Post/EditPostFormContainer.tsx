import { useState } from "react";
import { useRouter } from "next/router";
import { API, Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";

import Form from "./EditPostForm";
import { createPost, updatePost } from "../../src/graphql/mutations";
import { useErrorContext } from "../ErrorContextProvider";
import { useImageUrl } from "../../src/hooks";

function FormContainer({ post }: any) {
  const router = useRouter();
  const { setError } = useErrorContext();

  const [image, setImage] = useState(null);
  const imageUrl = useImageUrl(post);

  const onSubmit = async (formData: any) => {
    const id = post ? await editPost(formData) : await newPost(formData);
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

  const editPost = async (formData: any) => {
    const postUpdated = (({ id, title, content }: any) => ({ id, title, content }))(formData);

    await saveImage(postUpdated);

    try {
        await API.graphql({
        query: updatePost,
        variables: { input: postUpdated },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (e: any) {
      setError(e);
      return null;
    }

    return formData.id;
  }

  return <Form 
    post={post} 
    onSubmit={onSubmit} 
    imageUrl={imageUrl} 
    setImage={setImage} 
  />;
}

export default FormContainer;