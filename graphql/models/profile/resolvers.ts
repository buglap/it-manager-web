import prisma from "config/prisma";

const ProfileResolvers = {
    Query: {
        getProfiles: async (parent, args) => {
            return await prisma.profile.findMany();
        },
    },
    Mutation: {
        updateProfileImage: async (parent, args) => {
            return await prisma.user.update({
                where: {
                    id: args.user,
                },
                data: {
                    profile: {
                        upsert: {
                            create: {
                                image: args.image
                            },
                            update: {
                                image: args.image
                            }
                        }
                    }
                }
            })
        },
    }
};

export { ProfileResolvers };