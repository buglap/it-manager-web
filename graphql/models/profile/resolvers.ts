import prisma from "config/prisma";

const ProfileResolvers = {
    Query: {
        getProfiles: async (parent, args) => {
            return await prisma.profile.findMany();
        },
    },
};

export { ProfileResolvers };