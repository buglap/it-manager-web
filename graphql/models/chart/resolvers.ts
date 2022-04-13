import prisma from 'config/prisma';
import _ from 'lodash';

const ChartResolvers = {
    Query: {
        getChartData: async (parent, args) => {
            const available = (await prisma.$queryRaw`select sum("availableQuantiry")  from "Device"`)
            const availableQuantity = available[0]
            const assined = (await prisma.$queryRaw`select count(*) from "_DeviceToUser" dtu`)
            const assinedQuantity = assined[0]
            return {
                series: [
                    {
                        data: [availableQuantity['sum'], assinedQuantity["count"]]
                    }
                ],
            }
        }
    }
};

export { ChartResolvers };
