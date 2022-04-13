import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  enum Enum_IdType {
      national
      foreign
  }
  type Profile {
    id: ID
    user: User
    identificationType: Enum_IdType
    identificationNumber: String
    name: String
    phone: String
    direction: String
    image:  String
    position: Position
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getProfiles: [Profile]
  }
  type Mutation{
    updateProfileImage(user:String, image: String): User
  }
`;

export { ProfileTypes };