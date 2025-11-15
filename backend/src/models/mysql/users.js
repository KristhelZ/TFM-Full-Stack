import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('User', {
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:     { type: DataTypes.STRING(100), allowNull: false, field: 'name' },
    email:    { type: DataTypes.STRING(150), allowNull: false, unique: true, field: 'email' },
    password: { type: DataTypes.STRING(255), allowNull: false, field: 'password' }, 
    role:     { type: DataTypes.STRING(50), allowNull: false, field: 'role' },
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
