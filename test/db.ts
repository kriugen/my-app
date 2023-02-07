import { init as initDb } from "./aws/dynamo";
import { listUsers, init as initAuth } from "./aws/cognito";
import { addPost, deletePostsByTitle, init as initPosts } from "./posts";

import { username, region, userPoolId } from '../cypress.env.json';

export async function init() {
  console.log('[init]', region, new Date().toLocaleTimeString());
  
  initDb({ region });
  initAuth({ region });
  await initPosts();
}

export async function getFullUsername(username: string) {
  const data = await listUsers({ userPoolId });
  for (let i = 0; i < data.Users.length; ++i) {
    const user = data.Users[i];
    for (let j = 0; j < user.Attributes.length; ++j) {
      const attr = user.Attributes[j];
      if (attr.Name == 'sub') {
        return attr.Value + '::' + username;
      }
    }
  }
}

export async function seed() {
  console.log('[seed]');
  const fullUsername = await getFullUsername(username);
  await addPost({
    title: 'post 2', 
    content: 'post 2 test content', 
    username: fullUsername,
  });
}

export async function teardown() {
  console.log('[teardown]')
  await deletePostsByTitle('post 1');
  await deletePostsByTitle('post 2');
}