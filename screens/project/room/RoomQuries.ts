import gql from 'graphql-tag';

export const GET_CHAT = gql`
  query getChat($Project_id: Int!) {
    GetChat(Project_id: $Project_id) {
      ok
      error
      chat {
        Project_id
        Chat_id
        User_id
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
      Project_id
      Chat_id
      User_id
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
        user {
          Username
        }
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

export const GET_PROJECT_USERS = gql`
  query GetProjectUserDetail($Project_id: Int!) {
    getProjectUserDetail(Project_id: $Project_id) {
      user {
        User_id
        Username
      }
      position {
        Position_id
        Position_name
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProjectInfo($input: upProject!) {
    updateProjectInfo(input: $input) {
      ok
      error
      project {
        Project_id
        Project_name
        status
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProjectDetail($Project_id: Int!) {
    getProjectDetail(Project_id: $Project_id) {
      Project_id
      Project_name
      status
    }
  }
`;
