import { gql } from 'apollo-server-micro';

const DeviceTypeTypes = gql`
  enum Enum_DeviceType {
    Laptop
    Mouse
    Keyboard
    Display
    headband
    Charger
    Cell_phone
  }
  type DeviceType {
    id: ID
    name: Enum_DeviceType
    device: [Device]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getDeviceTypes: [DeviceType]
  }
`;

export { DeviceTypeTypes };