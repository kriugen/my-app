/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onCreatePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      image
      published
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onUpdatePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      image
      published
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onDeletePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      image
      published
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onCreateComment(filter: $filter, createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        image
        published
        createdAt
        updatedAt
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onUpdateComment(filter: $filter, createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        image
        published
        createdAt
        updatedAt
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onDeleteComment(filter: $filter, createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        image
        published
        createdAt
        updatedAt
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $createdBy: String
  ) {
    onCreateProfile(filter: $filter, createdBy: $createdBy) {
      id
      firstName
      lastName
      DOB
      image
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $createdBy: String
  ) {
    onUpdateProfile(filter: $filter, createdBy: $createdBy) {
      id
      firstName
      lastName
      DOB
      image
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $createdBy: String
  ) {
    onDeleteProfile(filter: $filter, createdBy: $createdBy) {
      id
      firstName
      lastName
      DOB
      image
      createdAt
      updatedAt
      createdBy
    }
  }
`;
