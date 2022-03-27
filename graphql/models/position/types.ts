import { gql } from 'apollo-server-micro';

const PositionTypes = gql`
  enum Enum_PositionName {
      developer
      architect
      managment
  }
  type Position {
    id: ID
    name: Enum_PositionName
    employees: [User]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getPositions: [Position]
  }
`;

export { PositionTypes };