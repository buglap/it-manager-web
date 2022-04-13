import { gql } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      image
      email
      profile {
        name
        id
        image
        direction
        phone
        identificationNumber
        identificationType
        position {
          name
        }
      }
  }
}
`;

export { GET_USER_PROFILE };