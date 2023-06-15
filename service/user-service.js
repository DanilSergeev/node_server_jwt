const { User } = require("../models/models")
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require("../exceptions/api-error")

class UserService {
    async registration(email, password, role = "USER") {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email существует - ${email}`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({ email, password: hashPassword, role })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }

    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest(`Пользователя не существует - ${email}`)
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Не верный пароль`)
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }

    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
        return { status: 200 }
    }

    async refresh(refresh) {
        if (!refresh) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refresh)
        const tokenFromDB = await tokenService.findToken(refresh)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({ where: { id: userData.id } })

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { tokens, userDto }
    }

    async getUsers() {
        const usersData = await User.findAll({ attributes: ['id', 'email', 'role'] })
        return usersData
    }
    async getUser(id) {
        const usersData = await User.findOne({ where: { id }, attributes: ['id', 'email', 'role'] })
        return usersData
    }
    async updateUser(id, role) {
        const userData = await User.update(
            { role },
            { where: { id } },
        )
        return userData
    }

    async deleteUser(id) {
        const userData = await User.destroy(
            { where: { id } },
        )
        return userData
    }

}


module.exports = new UserService()