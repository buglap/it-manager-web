import { gql } from '@apollo/client';

const CREATE_SUPPLIER = gql`
  mutation CreateSupplier($nit: String!, $name: String!, $phone: String!, $email: String!) {
    createSupplier(nit: $nit, name: $name, phone: $phone, email: $email) {
      id
    }
  }
`;

const EDIT_SUPPLIER = gql`
  mutation UpdateSupplier($updateSupplierId: String!, $nit: String!, $name: String!, $phone: String!, $email: String!) {
    updateSupplier(id: $updateSupplierId, nit: $nit, name: $name, phone: $phone, email: $email){
      id
    }
  }
`;

const DELETE_SUPPLIER = gql`
  mutation DeleteSupplier($id: String!) {
    deleteSupplier(id: $id) {
      id
    }
  }
`;

export { CREATE_SUPPLIER, EDIT_SUPPLIER, DELETE_SUPPLIER };
