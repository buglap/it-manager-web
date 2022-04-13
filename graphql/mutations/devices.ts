import { gql } from '@apollo/client';

const CREATE_DEVICES = gql`
  mutation CreateDevice($data: DeviceCreateInput!) {
    createDevice(data: $data) {
      id
    }
  }
`;

const EDIT_DEVICES = gql`
  mutation UpdateDevice($where: DeviceFilterId!, $data: DeviceUpdateInput!) {
    updateDevice(where: $where, data: $data){
      id
    }
  }
`;

const DELETE_DEVICES = gql`
  mutation DeleteDevice($where: DeviceFilterId!) {
    deleteDevice(where: $where) {
      id
    }
  }
`;

export { CREATE_DEVICES, EDIT_DEVICES, DELETE_DEVICES };