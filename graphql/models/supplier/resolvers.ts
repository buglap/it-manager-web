import prisma from "config/prisma";

const SupplierResolvers = {
    Supplier: {
        createdAt: async (parent, _, context) => {
            if (context.session.user.role.name === 'Admin') {
                return parent.createdAt;
            }

            return null;
        },
        updatedAt: (parent, _, context) => {
            if (context.session.user.role.name === 'Admin') {
                return parent.updatedAt;
            }

            return null;
        },
    },
    Query: {
        getSuppliers: async (parent, args, context) => {
            if (context.session.user.role.name === 'Admin') {
                return await prisma.supplier.findMany();
            }
        },
    },
    Mutation: {
        createSupplier: async (_, args, context) => {
            if (context.session.user.role.name === 'Admin') {
                const newSupplier = await prisma.supplier.create({
                    data: {
                        nit: args.nit,
                        name: args.name,
                        email: args.email,
                        phone: args.phone
                    },
                });
                return newSupplier;
            }
        },
        updateSupplier: async (_, args, context) => {
            if (context.session.user.role.name === 'Admin') {
                return await prisma.supplier.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        nit: {
                            set: args.nit
                        },
                        name: {
                            set: args.name,
                        },
                        email: {
                            set: args.email
                        },
                        phone: {
                            set: args.phone
                        }
                    },
                });
            }
        },
        deleteSupplier: async (_, args, context) => {
            if (context.session.user.role.name === 'Admin') {
                return await prisma.supplier.delete({
                    where: {
                        id: args.id,
                    },
                });
            }
        },
    },
};

export { SupplierResolvers };