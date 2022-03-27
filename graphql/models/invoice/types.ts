import { gql } from 'apollo-server-micro';

const InvoiceTypes = gql`
  type Invoice {
    id: ID
    date:  Date
    url: String
    devices: [Device]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getInvoices: [Invoice]
  }
`;

export { InvoiceTypes };