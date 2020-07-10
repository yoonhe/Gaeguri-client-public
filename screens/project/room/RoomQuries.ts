import gql from 'graphql-tag';

export const GET_CHAT = gql`
  query getChat($Project_id: Int!) {
    GetChat(Project_id: $Project_id) {
      ok
      error
      chat {
        Chat_id
        User_id
        Project_id
        Contents
        createdAt
        user {
          Username
        }
      }
    }
  }
`;

export const CHAT_SUBSCRIPTION = gql`
  subscription chatSub {
    ChatSub {
      Chat_id
      User_id
      Project_id
      Contents
      createdAt
      user {
        Username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendChat($Project_id: Int!, $Contents: String) {
    SendChat(Project_id: $Project_id, Contents: $Contents) {
      error
      ok
      chat {
        Chat_id
        User_id
        Project_id
        Contents
        createdAt
      }
    }
  }
`;

export const GET_MYINFO = gql`
  query getMyProfile {
    GetMyProfile {
      ok
      error
      user {
        User_id
        Username
      }
    }
  }
`;
