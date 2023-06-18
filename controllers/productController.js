
const ProductService = require("../service/product-service")
const ApiError = require("../exceptions/api-error")
const { Product } = require("../models/models")

class ProductController {

    async creatProduct(req, res, next) {
        try {
            const { name, price, inStock, categoryId, model, country, year, info } = req.body
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

            if (!img) {
                return next(ApiError.BadRequest("Изображение не передано"))
            }

            const product_info = {
                model, country, year, info
            }

            const productData = await ProductService.creatProduct(name, price, img, inStock, categoryId, product_info)
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
        console.log(req.body)
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const beforeData = await ProductService.getProduct(id)

            let { name, price, inStock, categoryId, model, country, year, info } = req.body
            let img = null
            if (req.files) {
                img = req.files
            }
            if (!model) {
                model = beforeData.productInfoData.dataValues.model
            }
            if (!country) {
                country = beforeData.productInfoData.dataValues.country
            }
            if (!year) {
                year = beforeData.productInfoData.dataValues.year
            }
            if (!info) {
                info = beforeData.productInfoData.dataValues.info
            }

            const product_info = {
                model, country, year, info
            }

            await ProductService.updateProduct(id, name, price, img, inStock, categoryId, product_info)
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