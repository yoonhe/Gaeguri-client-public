// import gql from 'graphql-tag';
import { gql } from 'apollo-boost';

export const GET_MYPROFILE = gql`
  query {
    GetMyProfile {
      ok
      error
      user {
        User_id
        Username
        Profile_photo_path
        AboutMe
        userstack {
          stack {
            Stack_id
            Stack_name
          }
        }
        Email
      }
    }
  }
`;

export const UPDATE_MYPROFILE = gql`
  mutation UpdateMyProfile(
    $Username: String!
    $Profile_photo_path: String
    $AboutMe: String
    $Stacks: [String]
  ) {
    UpdateMyProfile(
      Username: $Username
      Profile_photo_path: $Profile_photo_path
      AboutMe: $AboutMe
      stacks: $Stacks
    ) {
      ok
      error
      user {
        User_id
        Username
        Profile_photo_path
        AboutMe
        userstacks {
          stack {
            Stack_name
          }
        }
      }
    }
  }
`;
