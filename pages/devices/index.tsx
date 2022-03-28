import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_DEVICES = gql`
    query Query {
        getDevices {
            id 
            name
            availableQuantity
        }
    }
`;

const IndexDevices = () => {
    const { data, loading } = useQuery(GET_DEVICES);
    if (loading) return <div>Loading...</div>
    return (
        <div>
            <h2>Devices</h2>
            {data.getDevices.map((d) =>{
                return(
                    <div key={d.id}>
                        <span>name: {d.name}</span>
                        <span>disponibles: {d.availableQuantity}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default IndexDevices;