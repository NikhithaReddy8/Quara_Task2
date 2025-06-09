import {
  DataTypes,
  Model,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import sequelize from '../config/db';
import Member from './member.model';

class Role extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Sequelize mixin methods for many-to-many Member association
  public addMember!: BelongsToManyAddAssociationMixin<Member, string>;
  public removeMember!: BelongsToManyRemoveAssociationMixin<Member, string>;
  public getMembers!: BelongsToManyGetAssociationsMixin<Member>;
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No description',
    },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: true,
  }
);

export default Role;
