const Router = require("express").Router
const router = new Router()
const { body } = require("express-validator")

const userController = require("../controllers/userController")
const authMiddlware = require("../middlware/auth-middlware")
const checkRoleMiddlware = require("../middlware/checkRole-middleware")
const productController = require("../controllers/productController")
const categoryController = require("../controllers/categoryController")




router.post('/register',
    body('email').isEmail(),
    body('login').isLength({ min: 3, max: 32 }),
    body('password').isLength({ min: 3, max: 32 }),
    body('name').isLength({ min: 2, max: 32 }),
    body('otchestvo').isLength({ min: 2, max: 32 }),
    body('surname').isLength({ min: 2, max: 32 }),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUser)
router.put('/user/update/:id', checkRoleMiddlware("ADMIN"), authMiddlware, userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)
router.put('/product/:id', checkRoleMiddlware("ADMIN"), authMiddlware, productController.updateProduct)
router.post('/product', checkRoleMiddlware("ADMIN"), authMiddlware, productController.creatProduct)
router.delete('/product/:id', checkRoleMiddlware("ADMIN"), authMiddlware, productController.deleteProduct)

router.get('/categorys', categoryController.getCategorys)
router.get('/category/:id', categoryController.getCategory)
router.post('/category', checkRoleMiddlware("ADMIN"), authMiddlware, categoryController.creatCategory)
router.delete('/category/:id', checkRoleMiddlware("ADMIN"), authMiddlware, categoryController.deleteCategory)






module.exports = router