import { v4 as uuid } from "uuid";
import { addItem, deleteItem, getFullTableName, queryItems } from "./aws/dynamo";

let TableName: string;
export async function init() {
  TableName = await getFullTableName('Post');
}

export async function addPost(post: any) {
  const id = uuid();
  const now = new Date().toISOString();
  const params = {
    TableName,
    Item: {
      id: { S: id },
      title: { S: post.title },
      content: { S: post.content },
      username: { S: post.username },

      __typename: { S: 'Post' }, 
      createdAt: { S: now },
      updatedAt: { S: now },
    },
  };
  
  return addItem(params);
}

export async function deletePost(id: string) {
  const params = {
    TableName,
    Key: {
      id: { S: id },
    },
  };
  
  return deleteItem(params);
}

export async function getPostsByTitle(title: string) {
  const params = {
    KeyConditionExpression: "title = :s",
    ExpressionAttributeValues: {
      ":s": { S: title },
    },
    TableName,
    IndexName: 'postsByTitle',
  };

  return queryItems(params);
}

export async function deletePostsByTitle(title: string) {
  const data = await getPostsByTitle(title);
  for (const item of data.Items ?? []) {
    if (item.id.S) {
      await deletePost(item.id.S);
    }
  }
}