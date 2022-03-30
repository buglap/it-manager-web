import { gql } from '@apollo/client';

const CREATE_SUPPLIER = gql`
  mutation CreateClient($data: ClientCreateInput) {
    createClient(data: $data) {
      id
    }
  }
`;

const EDIT_SUPPLIER = gql`
  mutation UpdateClient($updateClientId: String!, $name: String!) {
    updateClient(id: $updateClientId, name: $name) {
      id
    }
  }
`;

const DELETE_SUPPLIER = gql`
  mutation DeleteClient($deleteClientId: String!) {
    deleteClient(id: $deleteClientId) {
      id
    }
  }
`;

export { CREATE_SUPPLIER, EDIT_SUPPLIER, DELETE_SUPPLIER };
