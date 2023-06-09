const Router = require("express").Router
const router = new Router()
const { body } = require("express-validator")

const userController = require("../controllers/userController")
const authMiddlware = require("../middlware/auth-middlware")
const checkRoleMiddlware = require("../middlware/checkRole-middleware")




router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

router.get('/users',  userController.getUsers)
router.get('/user/:id',  userController.getUser)
router.put('/user/update/:id', checkRoleMiddlware("ADMIN"),  authMiddlware, userController.updateUser)
router.delete('/user/:id',  userController.deleteUser)









module.exports = router