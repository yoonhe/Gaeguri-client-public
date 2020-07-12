import gql from 'graphql-tag';

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
