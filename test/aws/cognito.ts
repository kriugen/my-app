import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

let client: any = null;
export function init({ region }: any) {
  client = new CognitoIdentityProviderClient({ region });
}

const listUsers = async ({ userPoolId }: any) => {
  const command = new ListUsersCommand({
    UserPoolId: userPoolId,
  });

  return client.send(command);
};

export { listUsers };