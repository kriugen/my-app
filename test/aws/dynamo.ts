
import { DeleteItemCommand, DynamoDBClient, 
  ListTablesCommand,
  PutItemCommand,
  QueryCommand } from "@aws-sdk/client-dynamodb";

let ddbClient: any = null;
export function init({ region }: any) {
  ddbClient = new DynamoDBClient({ region });
}

export const getFullTableName = async (shortName: string) => {
  const data = await ddbClient.send(new ListTablesCommand({}));
  if (!data.TableNames || data.TableNames.length == 0) {
    throw Error('No tables found in database');
  }

  for (let i = 0; i < data.TableNames.length; ++i) {
    const tableName = data.TableNames[i];
    if (tableName.startsWith(shortName + '-')) {
      return tableName;
    }
  }

  return null;
}

export async function addItem(params: any) {
  console.log('[add]', params);
  return ddbClient.send(new PutItemCommand(params));
}

export async function deleteItem(params: any) {
  console.log('[delete]', params);
  return ddbClient.send(new DeleteItemCommand(params));
}

export function queryItems(params: any) {
  console.log('[query]', params);
  return ddbClient.send(new QueryCommand(params));
}