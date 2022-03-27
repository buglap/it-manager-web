import { RoleResolvers } from 'graphql/models/role/resolvers';
import { DeviceResolvers } from './models/device/resolvers';
import { DeviceTypeResolvers } from './models/devicetype/resolvers';
import { InvoiceResolvers } from './models/invoice/resolvers';
import { PageResolvers } from './models/page/resolvers';
import { PositionResolvers } from './models/position/resolvers';
import { ProfileResolvers } from './models/profile/resolvers';
import { RequirementResolvers } from './models/requirement/resolvers';
import { SupplierResolvers } from './models/supplier/resolvers';
import { UserResolvers } from './models/users/resolvers';

export const resolvers = [
    RoleResolvers,
    UserResolvers,
    DeviceResolvers,
    DeviceTypeResolvers,
    InvoiceResolvers,
    PageResolvers,
    PositionResolvers,
    ProfileResolvers,
    RequirementResolvers,
    SupplierResolvers
];