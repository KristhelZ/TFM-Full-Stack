import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'name' },
    enable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'enable' }
  }, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });


