import prisma from "config/prisma";

const RequirementResolvers = {
    Query: {
        getRequirements: async (parent, args) => {
            return await prisma.requirement.findMany();
        },
    },
};

export { RequirementResolvers };