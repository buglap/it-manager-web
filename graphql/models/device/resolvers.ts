import prisma from "config/prisma";

const DeviceResolvers = {
    Device: {
        deviceType: async (parent, args) => {
            return await prisma.deviceType.findUnique({
                where: {
                    id: parent.deviceTypeId
                }
            });
        },
        createdAt: async (parent, _, context) => {
            return parent.createdAt;
        },
        updatedAt: (parent, _, context) => {
            return parent.updatedAt;
        },
    },
    Query: {
        getDevices: async (parent, args) => {
            return await prisma.device.findMany();
        },
    },
};

export { DeviceResolvers };