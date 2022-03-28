import prisma from "config/prisma";

const DeviceTypeResolvers = {
    Query: {
        getDeviceTypes: async (parent, args) => {
            return await prisma.deviceType.findMany();
        },
    },
};

export { DeviceTypeResolvers };