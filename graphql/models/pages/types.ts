import { gql } from 'apollo-server-micro';

const PageTypes = gql`
  type Page {
    id: ID
    path: String
    name: String
  }
`;

export { PageTypes };