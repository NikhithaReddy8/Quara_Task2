import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Member from './member.model';
import Role from './role.model';
import { MemberRoleAttributes } from '../types';

class MemberRole extends Model<MemberRoleAttributes> implements MemberRoleAttributes {
  public memberId!: string;
  public roleId!: string;
}

MemberRole.init({
  memberId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: Member,
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: Role,
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: 'member_roles',
  timestamps: false,
});

Member.belongsToMany(Role, { through: MemberRole, foreignKey: 'memberId' });
Role.belongsToMany(Member, { through: MemberRole, foreignKey: 'roleId' });

export default MemberRole;
