import prisma from "config/prisma";

const RoleResolvers = {
    Query: {
        getRoles: async (parent, args) => {
            return await prisma.role.findMany(
                { include: { pages: true }, }
            );
        },
    },
};

export { RoleResolvers };