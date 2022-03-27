import prisma from "config/prisma";

const PositionResolvers = {
    Query: {
        getPositions: async (parent, args) => {
            return await prisma.position.findMany();
        },
    },
};

export { PositionResolvers };