import { getFullUsername, init } from "./db";
import { addPost } from "./posts";

import { username } from '../cypress.env.json';

export async function populatePosts() {
  const fullUsername = await getFullUsername(username);
  console.log('[populate posts]', username, fullUsername);

  for (let i = 1; i < 5; ++i) {
    const num = i.toString().padStart(2, '0');
    await addPost({
      title: 'post ' + num, 
      content: 'post test content ' + num, 
      username: fullUsername,
      published: 1,
    });
  }
}

init();
populatePosts();