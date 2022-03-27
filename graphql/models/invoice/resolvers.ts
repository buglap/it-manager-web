import prisma from "config/prisma";

const InvoiceResolvers = {
    Query: {
        getInvoices: async (parent, args) => {
            return await prisma.invoice.findMany();
        },
    },
};

export { InvoiceResolvers };