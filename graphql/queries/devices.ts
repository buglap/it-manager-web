import { gql } from '@apollo/client';

const GET_DEVICES = gql`
    query GetDevices {
        getDevices {
            name
            id
            description
            brand
            availableQuantiry
            invoice
            createdAt
            updatedAt
            deviceType {
                id
                name
            }
        }
    }
`;

export { GET_DEVICES };