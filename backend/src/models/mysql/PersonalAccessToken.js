import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('PersonalAccessToken', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },

    tokenable_type: { type: DataTypes.STRING(255), allowNull: false, field: 'tokenable_type', defaultValue: 'User' },
    tokenable_id:   { type: DataTypes.BIGINT,      allowNull: false, field: 'tokenable_id' },

    name:    { type: DataTypes.STRING(255), allowNull: true,  field: 'name' },    
    token:   { type: DataTypes.TEXT,        allowNull: false, field: 'token' },    
    abilities:    { type: DataTypes.TEXT,   allowNull: true,  field: 'abilities' },
    last_used_at: { type: DataTypes.DATE,   allowNull: true,  field: 'last_used_at' },
    expires_at:   { type: DataTypes.DATE,   allowNull: true,  field: 'expires_at' },

    created_at:   { type: DataTypes.DATE,   field: 'created_at', defaultValue: DataTypes.NOW },
    updated_at:   { type: DataTypes.DATE,   field: 'updated_at', defaultValue: DataTypes.NOW }
  }, {
    tableName: 'personal_access_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

