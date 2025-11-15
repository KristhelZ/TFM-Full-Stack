import { sequelize } from "../../config/mysql.js";
import RoleFactory from "./roles.js";
import UserFactory from "./users.js";
import ProductoFactory from "./products.js";
import PATFactory from "./PersonalAccessToken.js";
import { Order } from "./orders.js";

Order.initModel(sequelize);




const Role = RoleFactory(sequelize);
const User = UserFactory(sequelize);
const Producto = ProductoFactory(sequelize);
const PersonalAccessToken = PATFactory(sequelize);

Role.hasMany(User, { foreignKey: "role", sourceKey: "name" });
User.belongsTo(Role, { foreignKey: "role", targetKey: "name" });

User.hasMany(PersonalAccessToken, { foreignKey: "tokenable_id" });
PersonalAccessToken.belongsTo(User, { foreignKey: "tokenable_id" });
Order.associate({ Order, Producto, User });
export { sequelize, Role, User, Producto, Order, PersonalAccessToken };
