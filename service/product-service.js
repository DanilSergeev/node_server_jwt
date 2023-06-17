const { Product } = require("../models/models")
const uuid = require("uuid")
const path = require("path");


class ProductService {
    async creatProduct(name, price, img, inStock, categoryId) {
        let fileName = uuid.v4() + ".jpg"
        img.img.mv(path.resolve(__dirname, "..", "static", fileName))

        const productData = await Product.create(
            { name, price, img: fileName, inStock, categoryId },
        )
        return productData
    }

    async getProducts() {
        const productData = await Product.findAll()
        return productData
    }
    async getProduct(id) {
        const productData = await Product.findOne({ where: { id } })
        return productData
    }
    async updateProduct(id, name, price, img, inStock, categoryId) {
        const beforeData = await Product.findOne({ where: { id } })
        let fileName = ""

        if (!name) {
            name = beforeData.name
        }
        if (!price) {
            price = beforeData.price
        }
        if (!inStock) {
            inStock = beforeData.inStock
        }
        if (!categoryId) {
            categoryId = beforeData.categoryId
        }
        if (!img) {
            fileName = beforeData.img
        } else {
            fileName = uuid.v4() + ".jpg"
            img.img.mv(path.resolve(__dirname, "..", "static", fileName))
        }



        const productData = await Product.update(
            { name, price, file: fileName, inStock, categoryId },
            { where: { id } },
        )
        return productData
    }
    async deleteProduct(id) {
        const productData = await Product.destroy(
            { where: { id } },
        )
        return productData
    }


}



module.exports = new ProductService()