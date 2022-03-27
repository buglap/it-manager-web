import prisma from "config/prisma";

const SupplierResolvers = {
    Query: {
        getSuppliers: async (parent, args) => {
            return await prisma.supplier.findMany();
        },
    },
};

export { SupplierResolvers };