import { gql } from 'apollo-server-micro';

const PageTypes = gql`
  type Page {
    id: ID
    name:  String
    path:  String
    roles: [Role]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getPages: [Page]
  }
`;

export { PageTypes };