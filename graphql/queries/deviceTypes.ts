import { gql } from '@apollo/client';

const GET_DEVICESTYPES = gql`
    query GetDeviceTypes {
        getDeviceTypes {
            id
            name
        }
    }
`;

export { GET_DEVICESTYPES };