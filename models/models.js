const sequelize = require("../db")
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    name: { type: DataTypes.STRING, },
    surname: { type: DataTypes.STRING, },
    otchestvo: { type: DataTypes.STRING, defaultValue: "" },
    email: { type: DataTypes.STRING, },

    // confirmOdersId
}, { timestamps: false })


const TokenSchema = sequelize.define('tokenSchema', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING },
}, { timestamps: false })




//  infoId  categoryId
const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, },
    price: { type: DataTypes.STRING, defaultValue: "0" },
    img: { type: DataTypes.STRING, },
    inStock: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
}, { timestamps: false })


const Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
}, { timestamps: false })


const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.STRING, defaultValue: "0" },
    //statusId
}, { timestamps: false })

const ConfirmOrder = sequelize.define('confirmOrder', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //orderId
}, { timestamps: false })


const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //userId
}, { timestamps: false })

const Basket_product = sequelize.define('basket_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    //basketId  productId
}, { timestamps: false })



const Product_info = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    model: { type: DataTypes.STRING,  allowNull: true },
    country: { type: DataTypes.STRING, defaultValue: "Россия", allowNull: true },
    year: { type: DataTypes.STRING, defaultValue: "2023", allowNull: true },
    info: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false })



Basket.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "cascade",
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    onDelete: "cascade",
});


TokenSchema.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "cascade",
});

Product.hasOne(Product_info, { onDelete: 'CASCADE' });
Product_info.belongsTo(Product);


module.exports = {
    User,
    TokenSchema,
    Product,
    Category,
}