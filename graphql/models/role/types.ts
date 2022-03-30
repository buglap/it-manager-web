import { gql } from 'apollo-server-micro';

const RoleTypes = gql`
  enum Enum_RolName {
      Admin
      Employee
  }
  type Role {
    id: ID
    name: Enum_RolName
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getRoles: [Role]
  }
`;

export { RoleTypes };