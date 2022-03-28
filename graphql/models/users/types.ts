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

  input CreateUserAccountInput {
    email: String!
    name: String!
    auth0Id: String!
    role: String!
  }

  type Mutation {
    createUserAccount(data: CreateUserAccountInput!): User
  }

`;

export { UserTypes };