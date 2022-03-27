import { gql } from 'apollo-server-micro';
import { RoleTypes } from 'graphql/models/role/types';
import { DeviceTypes } from './models/device/types';
import { DeviceTypeTypes } from './models/devicetype/types';
import { InvoiceTypes } from './models/invoice/types';
import { PageTypes } from './models/page/types';
import { PositionTypes } from './models/position/types';
import { ProfileTypes } from './models/profile/types';
import { RequirementTypes } from './models/requirement/types';
import { SupplierTypes } from './models/supplier/types';
import { UserTypes } from './models/users/types';

const genericTypes = gql`
  scalar Date

  input StringEditField {
    set: String
  }
  input FloatEditField {
    set: Float
  }
  input IntEditField {
    set: Int
  }
  input DateEditField {
    set: Date
  }
`;

export const types = [
    genericTypes,
    RoleTypes,
    UserTypes,
    DeviceTypeTypes,
    DeviceTypes,
    InvoiceTypes,
    PageTypes,
    ProfileTypes,
    RequirementTypes,
    SupplierTypes,
    PositionTypes
];