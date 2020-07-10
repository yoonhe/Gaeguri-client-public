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

// export const SEND_MESSAGE = gql`
//   mutation sendMessage($text: String!, $chatId: Int!) {
//     SendChatMessage(text: $text, chatId: $chatId) {
//       ok
//       error
//       message {
//         id
//         text
//         userId
//       }
//     }
//   }
// `;

// mutation {
//   SendChat(Project_id: 2, Contents: "6번 사용자입니다") {
//     error
//     ok
//     chat {
//       Chat_id
//       Contents
//       createdAt
//       Project_id
//       User_id
//     }
//   }
// }
