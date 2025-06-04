import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Use Postgres-generated UUID
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name must not be empty',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },
}, {
  tableName: 'members',
  timestamps: true,
});

export default Member;
