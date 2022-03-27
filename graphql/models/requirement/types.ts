import { gql } from 'apollo-server-micro';

const RequirementTypes = gql`
  enum Enum_RequirementState {
    approved
    denied
    pending
  }
  type Requirement {
    id: ID
    reason: String
    isApproved: Enum_RequirementState
    comments: String
    employee: User
    device: [Device]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getRequirements: [Profile]
  }
`;

export { RequirementTypes };