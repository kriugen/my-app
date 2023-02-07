import { getFullUsername, init } from "./db";
import { addPost } from "./posts";

import { username } from '../cypress.env.json';

export async function populatePosts() {
  const fullUsername = await getFullUsername(username);
  console.log('[populate posts]', username, fullUsername);

  for (let i = 5; i < 20; ++i) {
    await addPost({
      title: 'post ' + i, 
      content: 'post test content ' + i, 
      username: fullUsername,
    });
  }
}

init();
populatePosts();