import { gql } from 'apollo-server-micro';

const DeviceTypes = gql`

  type Device {
    id: ID
    name: String
    description: String
    brand: String
    availableQuantiry: Int
    invoice: String
    deviceType: DeviceType
    employees: [User]
    requirements: [Requirement]
    createdAt: Date
    updatedAt: Date
  }

  input DeviceFilterId {
    id: String!
  }

  input DeviceCreateInput {
    name: String!
    decription: String!
    brand: String!
    availableQuantiry: Int!
    deviceType: String!
    invoice: String!
  }

  input DeviceUpdateInput {
    name: String!
    decription: String!
    brand: String!
    availableQuantiry: Int!
    deviceTypeId: String!
    invoice: String!
  }
  type Query {
    getDevices: [Device]
    getDevice(where: DeviceFilterId!): Device
  }

  type Mutation {
    createDevice(data: DeviceCreateInput!): Device
    updateDevice(where: DeviceFilterId!, data: DeviceUpdateInput!): Device
    deleteDevice(where: DeviceFilterId!): Device
  }
`;

export { DeviceTypes };