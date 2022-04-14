import prisma from "config/prisma";

const DeviceResolvers = {
    Device: {
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
    Mutation: {
        createDevice: async (_, args) => {
            const newDevice = await prisma.device.create({
                data: {
                    name: args.name,
                    description: args.description,
                    brand: args.brand,
                    availableQuantiry: args.availableQuantiry,
                    deviceType: args.deviceType,
                    invoice: args.invoice
                }
            });
            return newDevice;
        },
        updateDevice: async (_, args) => {
            return await prisma.device.update({
                where: {
                    id: args.id,
                },
                data: {
                    name: {
                        set: args.name,
                    },
                    description: {
                        set: args.description
                    },
                    brand: {
                        set: args.brand
                    },
                    availableQuantiry: {
                        set: args.availableQuantiry
                    },
                    deviceType: {
                        set: args.deviceType
                    },
                    invoice: {
                        set: args.invoice
                    }
                },
            });
        },
        deleteDevice: async (_, args, context) => {
            return await prisma.device.delete({
                where: {
                    id: args.id,
                },
            });
        }
    }
};

export { DeviceResolvers };