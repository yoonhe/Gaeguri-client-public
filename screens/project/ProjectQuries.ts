import gql from 'graphql-tag';

export const GET_PROJECT = gql`
  query GetAvailableProjectList {
    getAvailableProjectList {
      Project_id
      Project_name
      StartAt
      EndAt
      Desc
      status
      Owner_id
      projectstack {
        stack {
          Stack_name
        }
      }
      projectpositionno {
        NoOfPosition
        position {
          Position_name
        }
      }
    }
  }
`;

export const GET_PROJECT_STATUS_FILTER = gql`
  query GetMyProjectListwithStatus {
    getMyProjectListwithStatus {
      statusProject {
        onGoing {
          Project_id
          Project_name
          StartAt
          EndAt
          Desc
          status
          Owner_id
          projectstack {
            stack {
              Stack_name
            }
          }
          projectpositionno {
            NoOfPosition
            position {
              Position_name
            }
          }
        }
        end {
          Project_id
          Project_name
          StartAt
          EndAt
          Desc
          status
          Owner_id
          projectstack {
            stack {
              Stack_name
            }
          }
          projectpositionno {
            NoOfPosition
            position {
              Position_name
            }
          }
        }
      }
    }
  }
`;
