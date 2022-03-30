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
    getSuppliers: [Supplier]
  }

  type Mutation {
    createSupplier(nit: String, name: String, phone: String, email: String): Supplier
    updateSupplier(id: String!, nit: String, name: String, phone: String, email: String): Supplier
    deleteSupplier(id: String!): Supplier
  }
`;

export { SupplierTypes };