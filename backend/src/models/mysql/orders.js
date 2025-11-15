import { DataTypes, Model } from "sequelize";

export class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // null = invitado
        name: { type: DataTypes.STRING(120), allowNull: false },
        address: { type: DataTypes.STRING(255), allowNull: false },
        productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
        unitPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0.00 },
        total: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0.00 },
        status: {
          type: DataTypes.ENUM("created", "paid", "shipped", "cancelled"),
          allowNull: false,
          defaultValue: "created",
        },
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
      }
    );
    return Order;
  }

  static associate(models) {
    if (models.User) {
      Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
    if (models.Producto) {
      Order.belongsTo(models.Producto, { foreignKey: "productId", as: "product" });
    }
  }
}
