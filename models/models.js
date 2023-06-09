const sequelize = require("../db")
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
}, { timestamps: false })




const TokenSchema = sequelize.define('tokenSchema', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING },
}, { timestamps: false })



TokenSchema.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "cascade",
});


module.exports = {
    User,
    TokenSchema,
}