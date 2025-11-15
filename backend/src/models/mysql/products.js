import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name:     { type: DataTypes.STRING(120), allowNull: false, field: 'name' },
    brand:      { type: DataTypes.STRING(120), allowNull: true,  field: 'brand' },
    category:  { type: DataTypes.STRING(120), allowNull: true,  field: 'category' },
    description:{ type: DataTypes.TEXT,        allowNull: true,  field: 'description' },

    price:     { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0, field: 'price' },
    stock:      { type: DataTypes.INTEGER,      allowNull: false, defaultValue: 0, field: 'stock' },

    image_url: { type: DataTypes.STRING(255), allowNull: true,  field: 'image_url' },

    active:     { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'active' },
  }, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

