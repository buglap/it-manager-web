import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    email: String
    role: Role
    profile: Profile
    requirements: [Requirement]
    devices: [Device]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getUsers: [User]
    getUser(email: String!): User
  }
`;

export { UserTypes };