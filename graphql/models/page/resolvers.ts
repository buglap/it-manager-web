import prisma from "config/prisma";

const PageResolvers = {
    Query: {
        getPages: async (parent, args) => {
            return await prisma.position.findMany();
        },
    },
};

export { PageResolvers };