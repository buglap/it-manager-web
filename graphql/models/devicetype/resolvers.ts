import prisma from "config/prisma";

const DeviceTypeResolvers = {
    Query: {
        getDeviceType: async (parent, args) => {
            return await prisma.deviceType.findMany();
        },
    },
};

export { DeviceTypeResolvers };