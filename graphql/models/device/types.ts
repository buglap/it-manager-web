import { gql } from 'apollo-server-micro';

const DeviceTypes = gql`

  enum Enum_DeviceType {
      Laptop
      Mouse
      Keyboard
      Display
      headband
      Charger
      Cell_phone
    }

  type Device {
    id: ID
    name: String
    description: String
    brand: String
    availableQuantiry: Int
    invoice: String
    deviceType: Enum_DeviceType
    employees: [User]
    requirements: [Requirement]
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getDevices: [Device]
    getDevice(id: String!): Device
  }

  type Mutation {
    createDevice(name: String!, decription: String!, brand: String!, availableQuantiry: Int!, deviceType: String!, invoice: String!): Device
    updateDevice(id: String!, name: String!, decription: String!, brand: String!, availableQuantiry: Int!, deviceType: String!, invoice: String!): Device
    deleteDevice(id: String!): Device
  }
`;

export { DeviceTypes };