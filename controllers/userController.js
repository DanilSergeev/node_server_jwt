const userService = require("../service/user-service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const { login, password, role, name, surname, otchestvo, email } = req.body
            const userData = await userService.registration(login, password, role, name, surname, otchestvo, email)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const userData = await userService.login( login, password)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)

        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.json(token)
        } catch (error) {
            next(error)

        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })//secure: true
            return res.json(userData)
        } catch (error) {
            next(error)

        }
    }

    async getUsers(req, res, next) {
        try {
            const usersData = await userService.getUsers()
            res.json(usersData)
        } catch (error) {
            next(error)
        }
    }
    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const usersData = await userService.getUser(id)
            res.json(usersData)
        } catch (error) {
            next(error)
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const { role } = req.body

            await userService.updateUser(id, role)
            res.json("Обновлено")
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await userService.deleteUser(id)
            res.json("Удалённо")
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new UserController()