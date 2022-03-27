import { gql } from 'apollo-server-micro';

const DeviceTypes = gql`

  type Device {
    id: ID
    name: String
    description: String
    brand: String
    availableQuantiry: Int
    invoice: Invoice
    deviceType: DeviceType
    employees: [User]
    requirements: [Requirement]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getDevices: [Device]
  }
`;

export { DeviceTypes };