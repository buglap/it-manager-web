import prisma from "config/prisma";

const DeviceResolvers = {
    Query: {
        getDevices: async (parent, args) => {
            return await prisma.device.findMany();
        },
    },
};

export { DeviceResolvers };