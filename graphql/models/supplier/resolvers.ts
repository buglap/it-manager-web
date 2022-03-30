import prisma from "config/prisma";

const SupplierResolvers = {
    Supplier: {
        createdAt: async (parent, _, context) => {
            if (context.session.user.role.name === 'Admin') {
                return parent.createdAt;
            }

            return null;
        },
    },
    Query: {
        getSuppliers: async (parent, args) => {
            return await prisma.supplier.findMany();
        },
    },
    Mutation: {
        createSupplier: async (_, args) => {
            const newSupplier = await prisma.supplier.create({
                data: {
                    nit: args.nit,
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                },
            });
            return newSupplier;
        },
        updateSupplier: async (_, args) => {
            return await prisma.supplier.update({
                where: {
                    id: args.id,
                },
                data: {
                    name: {
                        set: args.name,
                    },
                },
            });
        },
        deleteSupplier: async (_, args, context) => {
            if (context.session.user.role.name === 'Admin') {
                return await prisma.supplier.delete({
                    where: {
                        id: args.id,
                    },
                });
            }
            return null;
        },
    },
};

export { SupplierResolvers };