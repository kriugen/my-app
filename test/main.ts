import { getFullUsername, init } from "./db";
import { addPost, deletePostsByTitle } from "./posts";

import { username } from '../cypress.env.json';

export async function populatePosts() {
  const fullUsername = await getFullUsername(username);
  console.log('[populate posts]', username, fullUsername);

  // await addPost({
  //   title: 'post 2', 
  //   content: 'post 2 test content', 
  //   username: fullUsername,
  // });
}

init();
populatePosts();