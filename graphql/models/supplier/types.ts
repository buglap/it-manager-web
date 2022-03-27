import { gql } from 'apollo-server-micro';

const SupplierTypes = gql`
  type Supplier {
    id: ID
    nit: String
    name: String
    email: String
    phone: String
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getSuppliers: [SupplierTypes]
  }
`;

export { SupplierTypes };