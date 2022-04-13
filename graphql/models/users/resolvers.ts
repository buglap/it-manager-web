import prisma from "config/prisma";

const UserResolvers = {
    User: {
        role: async (parent, args) => {
            return await prisma.role.findUnique({
                where: {
                    id: parent.roleId
                },
                include: { pages: true }
            });
        },
        profile: async (parent, args) => {
            return await prisma.profile.findUnique({
                where: {
                    userId: parent.id,
                },
            });
        },
    },
    Query: {
        getUsers: async (parent, args) => {
            return await prisma.user.findMany();
        },
        getUser: async (parent, args) => {
            return await prisma.user.findUnique({
                where: {
                    email: args.email
                }
            });
        },
    },
    Mutation: {
        createUserAccount: async (parent, args) => {
            return await prisma.user.create({
                data: {
                    email: args.data.email,
                    name: args.data.name,
                    image: args.data.image,
                    role: {
                        connect: {
                            name: args.data.role,
                        },
                    },
                    accounts: {
                        create: {
                            provider: 'auth0',
                            type: 'oauth',
                            providerAccountId: args.data.auth0Id,
                        },
                    },
                },
            });
        },
    },
};

export { UserResolvers };