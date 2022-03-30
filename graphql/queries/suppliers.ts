import { gql } from '@apollo/client';

const GET_SUPPLIERS = gql`
  query GetSuppliers {
    getSuppliers {
      id
      nit
      name
      email
      phone
    }
  }
`;

export { GET_SUPPLIERS };
