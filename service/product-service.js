const { Product, Product_info, Category } = require("../models/models")
const uuid = require("uuid")
const path = require("path");


class ProductService {
    async creatProduct(name, price, img, inStock, categoryId, product_info) {
        let fileName = uuid.v4() + ".jpg"
        img.img.mv(path.resolve(__dirname, "..", "static", fileName))


        const productData = await Product.create(
            { name, price, img: fileName, inStock, categoryId, product_info },
            { include: [{ model: Product_info }] }

        )
        return productData
    }

    async getProducts() {
        const productData = await Product.findAll()
        const categoryData = await Category.findAll()
        const productInfoData = await Product_info.findAll()
        const data = productData.map(item => {
            const category = categoryData.find(categoryItem => categoryItem.id === item.categoryId ? categoryItem.name : null);
            const categoryName = category ? category.name : null;
        
            const productInfo = productInfoData.find(productInfoItem => productInfoItem.id === item.productInfoId);
            const productInfoName = productInfo ? productInfo.dataValues : null;
        
            return ({ ...item.dataValues, categoryName, productInfoName });
          });
        return data
    }
    async getProduct(id) {
        const productData = await Product.findOne({ where: { id } })
        const categoryData = await Category.findOne({ where: { id: productData.categoryId } })
        const productInfoData = await Product_info.findOne({ where: { id: productData.productInfoId } })

        return { productData: productData, categoryData: categoryData.name, productInfoData: productInfoData }
    }
    async updateProduct(id, name, price, img, inStock, categoryId, product_info) {
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

        await Product_info.update(
            { model: product_info.model, country: product_info.country, year: product_info.year, info: product_info.info },
            { where: { id: beforeData.productInfoId } },
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