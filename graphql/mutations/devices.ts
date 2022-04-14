import { gql } from '@apollo/client';

const CREATE_DEVICES = gql`
  mutation CreateDevice($name: String!, $decription: String!, $brand: String!, $availableQuantiry: Int!, $deviceType: String!, $invoice: String!) {
    createDevice(name: $name, decription: $decription, brand: $brand, availableQuantiry: $availableQuantiry, deviceType: $deviceType, invoice: $invoice) {
      id
    }
  }
`;

const EDIT_DEVICES = gql`
  mutation UpdateDevice($id: String!, $name: String!, $decription: String!, $brand: String!, $availableQuantiry: Int!, $deviceType: String!, $invoice: String!) {
    updateDevice(id: $id, name: $name, decription: $decription, brand: $brand, availableQuantiry: $availableQuantiry, deviceType: $deviceType, invoice: $invoice) {
      id
    }
  }
`;

const DELETE_DEVICES = gql`
  mutation DeleteDevice($id: String!) {
    deleteDevice(id: $id) {
      id
    }
  }
`;

export { CREATE_DEVICES, EDIT_DEVICES, DELETE_DEVICES };