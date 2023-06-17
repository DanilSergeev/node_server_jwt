
const ProductService = require("../service/product-service")
const ApiError = require("../exceptions/api-error")

class ProductController {

    async creatProduct(req, res, next){
        try {
            const {name, price, inStock, categoryId} = req.body
            if (!name) {
                return next(ApiError.BadRequest("name не передан"))
            }
            if (!price) {
                return next(ApiError.BadRequest("price не передан"))
            }
            if (!inStock) {
                return next(ApiError.BadRequest("inStock не передан"))
            }
            if (!categoryId) {
                return next(ApiError.BadRequest("categoryId не передан"))
            }
            let img = null
            img = req.files

            if(!img){
                return next(ApiError.BadRequest("Изображение не передано"))
            }

            // file
            const productData = await ProductService.creatProduct( name, price, img, inStock, categoryId)
            res.json(productData)
        } catch (error) {
            next(error)
        }
    }

  
    async getProducts(req, res, next) {
        try {
            const productData = await ProductService.getProducts()
            res.json(productData)
        } catch (error) {
            next(error)
        }
    }
    async getProduct(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const productData = await ProductService.getProduct(id)
            res.json(productData)
        } catch (error) {
            next(error)
        }
    }
    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const {name, price, inStock, categoryId} = req.body
            let img = null
            if(req.files){
                img = req.files
            }

            await ProductService.updateProduct(id, name, price, img, inStock, categoryId)
            res.json("Обновлено")
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await ProductService.deleteProduct(id)
            res.json("Удалённо")
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ProductController()